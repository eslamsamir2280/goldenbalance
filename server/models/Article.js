// models/Article.js
const mongoose = require("mongoose");

// هيكل المقال الواحد
const singleArticleSchema = new mongoose.Schema({
  category: { type: String, default: "" },
  date: { type: String, default: "" },
  title: { type: String, default: "" },
  desc: { type: String, default: "" }, // الوصف القصير للكارت
  image: { type: String, default: "" },
  readTime: { type: String, default: "" },
  author: { type: String, default: "" },
  authorRole: { type: String, default: "" },
  body: { type: String, default: "" }, // محتوى المقال (HTML Text Editor)
});

// هيكل اللغة الواحدة
const translationSchema = new mongoose.Schema({
  tag: { type: String, default: "" },
  title: { type: String, default: "" },
  readMore: { type: String, default: "" },
  articles: [singleArticleSchema],
});

const articleSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Article", articleSchema);
