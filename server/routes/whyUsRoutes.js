// routes/whyUsRoutes.js
const express = require("express");
const router = express.Router();
const WhyUs = require("../models/WhyUs");

router.get("/", async (req, res) => {
  try {
    const whyUs = await WhyUs.findOne();
    res.json(whyUs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching WhyUs data", error });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedWhyUs = await WhyUs.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedWhyUs);
  } catch (error) {
    res.status(500).json({ message: "Error updating WhyUs data", error });
  }
});

module.exports = router;
