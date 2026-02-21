const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken"); // <-- 1. استيراد مكتبة التوكن
require("dotenv").config();

const app = express();
const server = http.createServer(app);

// إعداد Socket.io مع السماح بـ CORS
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// ==========================================
// 1. إعدادات السيرفر (Middlewares)
// ==========================================
app.use(cors());
app.use(express.json());

// ==========================================
// 2. الاتصال بقاعدة البيانات (MongoDB)
// ==========================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ==========================================
// 3. ميدل وير الحماية (JWT Middleware)
// ==========================================
const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "غير مصرح لك بالدخول، التوكن مفقود" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "التوكن غير صالح أو انتهت صلاحيته" });
  }
};

// ==========================================
// 4. مسار تسجيل الدخول للأدمن (Login)
// ==========================================
app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  // التحقق من الإيميل والباسورد من ملف .env
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    // إنشاء التوكن (صالح لمدة 24 ساعة)
    const token = jwt.sign(
      { role: "admin", email: email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" },
    );
    return res.status(200).json({ success: true, token });
  } else {
    return res
      .status(401)
      .json({
        success: false,
        message: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
      });
  }
});

// ==========================================
// 5. تفعيل المسارات (API Endpoints)
// ==========================================
app.use("/api/hero", require("./routes/heroRoutes"));
app.use("/api/about", require("./routes/aboutRoutes"));
app.use("/api/whyus", require("./routes/whyUsRoutes"));
app.use("/api/practiceareas", require("./routes/practiceAreasRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/faq", require("./routes/faqRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/messages", require("./routes/messageRoutes")); // يفضل إضافة authenticateAdmin داخل ملف الراوتس لطلبات الـ GET والـ DELETE

// --- مسار إضافي للأدمين لجلب قائمة "الغرف" (تمت إضافة الحماية authenticateAdmin) ---
const Chat = require("./models/Chat");
app.get("/api/chats/rooms", authenticateAdmin, async (req, res) => {
  try {
    const rooms = await Chat.distinct("roomId");
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

// ==========================================
// 6. إعدادات الشات اللحظي (Socket.io)
// ==========================================
io.on("connection", (socket) => {
  console.log("⚡ User Connected:", socket.id);

  // 1. انضمام الأدمن لغرفة المراقبة العامة (عشان يلقط التنبيهات من أي عميل)
  socket.on("join_admin", () => {
    socket.join("admin_room");
    console.log("🛡️ Admin joined monitoring room: admin_room");
  });

  // 2. انضمام لغرفة محادثة معينة (سواء عميل أو أدمن)
  socket.on("join_chat", async (roomId) => {
    socket.join(roomId);
    console.log(`👤 User joined room: ${roomId}`);

    const history = await Chat.find({ roomId }).sort({ timestamp: 1 });
    socket.emit("chat_history", history);
  });

  // 3. إرسال الرسائل
  socket.on("send_message", async (data) => {
    try {
      const newMessage = new Chat({
        roomId: data.roomId,
        sender: data.sender,
        message: data.message,
      });
      await newMessage.save();

      // نبعت الرسالة لكل اللي فاتحين الغرفة دي (عشان تظهر للطرف التاني)
      socket.to(data.roomId).emit("receive_message", data);

      // 🔥 التعديل الأهم للتنبيهات:
      // لو الرسالة جاية من العميل، نبعتها كمان لغرفة "الأدمن" عشان النقطة الحمراء تنور
      if (data.sender !== "admin") {
        socket.to("admin_room").emit("receive_message", data);
      }
    } catch (err) {
      console.error("❌ Error saving chat:", err);
    }
  });

  socket.on("disconnect", () => {
    console.log("👋 User Disconnected");
  });
});

// مسار تجريبي
app.get("/", (req, res) => {
  res.send("Law Firm Backend with Socket.io & JWT is running!");
});

// ==========================================
// 7. تشغيل السيرفر
// ==========================================
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
