const express = require("express");
const router = express.Router();
const FAQ = require("../models/FAQ");

router.get("/", async (req, res) => {
  try {
    const data = await FAQ.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQ", error });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedData = await FAQ.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error });
  }
});

module.exports = router;
