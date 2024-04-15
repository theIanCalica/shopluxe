const express = require("express");
const router = express.Router();
const Region = require("../model/region");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const multer = require("multer");
const upload = multer(); // Initialize multer

router.post(
  "/create-region",
  upload.none(),
  catchAsynchErrors(async (req, res, next) => {
    try {
      const name = req.body.name;

      const existingRegion = await Region.findOne({ name });
      if (existingRegion) {
        // Region already exists
        return res.status(400).json({ error: "Region already exists" });
      } else {
        // Create a new region
        const newRegion = new Region({
          name: name,
        });
        await newRegion.save();
        return res.status(201).json({ message: "Region created successfully" });
      }
    } catch (error) {
      console.error("Error creating region:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })
);

router.get(
  "/regions-list",
  catchAsynchErrors(async (req, res) => {
    try {
      const regions = await Region.find();
      res.json(regions);
    } catch (error) {
      // Handle errors
      console.error("Error fetching regions:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  })
);
module.exports = router;
