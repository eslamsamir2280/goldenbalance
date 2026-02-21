// models/Hero.js
const mongoose = require("mongoose");

// مخطط فرعي (Sub-schema) للإحصائيات
const statSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
});

// مخطط الترجمة لكل لغة
const translationSchema = new mongoose.Schema({
  badge: { type: String, default: "" }, // تمت إضافة البادج
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  subtitle: { type: String, required: true },
  primaryCta: { type: String, required: true }, // بدلاً من btn1
  secondaryCta: { type: String, required: true }, // بدلاً من btn2
  stats: [statSchema], // تمت إضافة مصفوفة الإحصائيات
});

const heroSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
    leftImage: { type: String, required: true },
    rightImage: { type: String, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Hero", heroSchema);
