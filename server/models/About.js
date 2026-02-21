// models/About.js
const mongoose = require("mongoose");

const translationSchema = new mongoose.Schema({
  tag: { type: String, required: true },
  title1: { type: String, required: true },
  title2: { type: String, required: true },
  p1: { type: String, required: true },
  p2: { type: String, required: true },
  visionTitle: { type: String, required: true },
  visionText: { type: String, required: true },
  cta: { type: String, required: true },
});

const aboutSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
    image: { type: String, required: true }, // صورة السكشن
  },
  { timestamps: true },
);

module.exports = mongoose.model("About", aboutSchema);
