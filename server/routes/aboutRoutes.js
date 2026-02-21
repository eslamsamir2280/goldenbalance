// routes/aboutRoutes.js
const express = require("express");
const router = express.Router();
const About = require("../models/About");

// 1. جلب البيانات
router.get("/", async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about data", error });
  }
});

// 2. تحديث البيانات (أو إنشائها لأول مرة)
router.put("/", async (req, res) => {
  try {
    const updatedAbout = await About.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedAbout);
  } catch (error) {
    res.status(500).json({ message: "Error updating about data", error });
  }
});

module.exports = router;
