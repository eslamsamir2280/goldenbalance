const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    language: { type: String },
    serviceArea: { type: String },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }, // عشان نعلم الرسالة اتقرأت ولا لأ
  },
  { timestamps: true },
);

module.exports = mongoose.model("Message", messageSchema);
