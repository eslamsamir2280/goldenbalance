// routes/heroRoutes.js
const express = require("express");
const router = express.Router();
const Hero = require("../models/Hero");

// 1. الحصول على بيانات الـ Hero
router.get("/", async (req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hero data", error });
  }
});

// 2. تحديث أو إنشاء بيانات الـ Hero (من لوحة التحكم)
router.put("/", async (req, res) => {
  try {
    // findOneAndUpdate بـ upsert: true معناها: لو مفيش داتا اعملها، لو في حدثها
    const updatedHero = await Hero.findOneAndUpdate(
      {}, // بنسيبها فاضية عشان هو document واحد
      req.body,
      { new: true, upsert: true },
    );
    res.json(updatedHero);
  } catch (error) {
    res.status(500).json({ message: "Error updating hero data", error });
  }
});

module.exports = router;
