const mongoose = require("mongoose");

// الكروت الأساسية (فيها قائمة مميزات وصورة)
const primarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  items: [{ type: String }], // مصفوفة نصوص
});

// الكروت الفرعية (فيها وصف وأيقونة)
const secondarySchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true }, // SVG كنص
});

const translationSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title: { type: String, required: true },
  viewAll: { type: String, required: true },
  primaryBadge: { type: String, required: true },
  explore: { type: String, required: true },
  secondaryTitle: { type: String, required: true },
  primary: [primarySchema],
  secondary: [secondarySchema],
});

const practiceAreasSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
  },
  { timestamps: true },
);

module.exports = mongoose.model("PracticeAreas", practiceAreasSchema);
