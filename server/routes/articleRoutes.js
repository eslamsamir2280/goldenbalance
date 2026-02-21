// routes/articleRoutes.js
const express = require("express");
const router = express.Router();
const Article = require("../models/Article");

router.get("/", async (req, res) => {
  try {
    const data = await Article.findOne();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
});

router.put("/", async (req, res) => {
  try {
    const updatedData = await Article.findOneAndUpdate({}, req.body, {
      new: true,
      upsert: true,
    });
    res.json(updatedData);
  } catch (error) {
    res.status(500).json({ message: "Error updating articles", error });
  }
});

module.exports = router;
