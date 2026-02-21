const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Message = require("../models/Message");

// إعداد Nodemailer باستخدام بيانات الـ .env
const transporter = nodemailer.createTransport({
  service: "gmail", // أو outlook أو أي خدمة تانية
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. مسار إرسال رسالة جديدة (من العميل)
router.post("/", async (req, res) => {
  try {
    const { fullName, email, phone, language, serviceArea, message } = req.body;

    // حفظ الرسالة في قاعدة البيانات
    const newMessage = new Message({
      fullName,
      email,
      phone,
      language,
      serviceArea,
      message,
    });
    await newMessage.save();

    // تجهيز الإيميل اللي هيتبعتلك
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.RECEIVER_EMAIL,
      subject: `استشارة جديدة من: ${fullName} - ${serviceArea}`,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
          <h2 style="color: #D4AF37;">طلب استشارة قانونية جديد</h2>
          <p><strong>الاسم:</strong> ${fullName}</p>
          <p><strong>البريد:</strong> ${email}</p>
          <p><strong>الهاتف:</strong> ${phone}</p>
          <p><strong>الخدمة المطلوبة:</strong> ${serviceArea}</p>
          <p><strong>اللغة المفضلة:</strong> ${language}</p>
          <hr />
          <p><strong>الرسالة:</strong><br/> ${message}</p>
        </div>
      `,
    };

    // إرسال الإيميل
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.log("Email error: ", error);
      else console.log("Email sent: " + info.response);
    });

    res.status(201).json({ success: true, message: "تم إرسال الرسالة بنجاح" });
  } catch (error) {
    res.status(500).json({ success: false, message: "حدث خطأ أثناء الإرسال" });
  }
});

// 2. مسار جلب الرسائل للوحة التحكم
router.get("/", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 }); // الأحدث أولاً
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

// 3. مسار لحذف رسالة
router.delete("/:id", async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({ message: "تم الحذف" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
});

// 4. مسار لجعل الرسالة "مقروءة"
router.put("/:id/read", async (req, res) => {
  try {
    const msg = await Message.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true },
    );
    res.json(msg);
  } catch (error) {
    res.status(500).json({ message: "Error updating message status" });
  }
});

module.exports = router;
