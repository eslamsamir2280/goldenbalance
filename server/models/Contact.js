const mongoose = require("mongoose");

// هيكل نصوص الفورم (الـ Placeholders والـ Labels)
const fieldsSchema = new mongoose.Schema({
  fullName: { type: String, default: "" },
  fullNamePH: { type: String, default: "" },
  email: { type: String, default: "" },
  emailPH: { type: String, default: "" },
  phone: { type: String, default: "" },
  phonePH: { type: String, default: "" },
  language: { type: String, default: "" },
  serviceArea: { type: String, default: "" },
  message: { type: String, default: "" },
  messagePH: { type: String, default: "" },
});

const translationSchema = new mongoose.Schema({
  tag: { type: String, default: "" },
  title: { type: String, default: "" },
  subtitle: { type: String, default: "" },
  fields: fieldsSchema,
  languages: [{ type: String }], // مصفوفة لغات التواصل
  services: [{ type: String }], // مصفوفة مجالات الخدمة
  submit: { type: String, default: "" },
  hqTitle: { type: String, default: "" },
  hqName: { type: String, default: "" },
  hqAddress: { type: String, default: "" },
  phone: { type: String, default: "" },
  email: { type: String, default: "" },
  whatsapp: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  viewMap: { type: String, default: "" },
  // ضفنا دول عشان اللينكات تشتغل بجد
  whatsappUrl: { type: String, default: "" },
  linkedinUrl: { type: String, default: "" },
  mapUrl: { type: String, default: "" },
});

const contactSchema = new mongoose.Schema(
  {
    ar: translationSchema,
    en: translationSchema,
    it: translationSchema,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactSchema);
