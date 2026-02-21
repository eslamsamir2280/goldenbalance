const express = require("express");
const router = express.Router();
const PracticeAreas = require("../models/PracticeAreas");

router.get("/", async (req, res) => {
  try {
    const data = await PracticeAreas.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedData = await PracticeAreas.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Error updating data", error });
  }
});

module.exports = router;
