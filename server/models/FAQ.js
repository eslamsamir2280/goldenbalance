const mongoose = require("mongoose");

// هيكل السؤال والإجابة
const questionSchema = new mongoose.Schema({
  q: { type: String, default: "" },
  a: { type: String, default: "" },
});

// هيكل اللغة
const translationSchema = new mongoose.Schema({
  tag: { type: String, default: "" },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  questions: [questionSchema], // مصفوفة الأسئلة
});

const faqSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
  },
  { timestamps: true },
);

module.exports = mongoose.model("FAQ", faqSchema);
