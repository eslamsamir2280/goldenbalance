const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.get("/", async (req, res) => {
  try {
    const data = await Contact.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching contact data", error });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedData = await Contact.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Error updating contact data", error });
  }
});

module.exports = router;
