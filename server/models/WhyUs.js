// models/WhyUs.js
const mongoose = require("mongoose");

// هيكل الكارت الواحد (أيقونة، عنوان، وصف)
const cardSchema = new mongoose.Schema({
  icon: { type: String, required: true }, // هنحفظ كود الـ SVG كنص
  title: { type: String, required: true },
  desc: { type: String, required: true },
});

// هيكل اللغة الواحدة
const translationSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  cards: [cardSchema], // مصفوفة الكروت
});

const whyUsSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
  },
  { timestamps: true },
);

module.exports = mongoose.model("WhyUs", whyUsSchema);
