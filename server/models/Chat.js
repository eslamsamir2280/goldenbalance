const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  roomId: { type: String, required: true }, // معرف فريد للعميل (ممكن نستخدم الـ IP أو ID عشوائي)
  sender: { type: String, enum: ["client", "admin"], required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Chat", chatSchema);
