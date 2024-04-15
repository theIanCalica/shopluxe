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
        return next(new ErrorHandler("User already exists", 400));
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

//Route for getting all the regions
router.get(
  "/regions-list",
  catchAsynchErrors(async (req, res) => {
    try {
      const regions = await Region.find().sort({ name: 1 });
      res.json(regions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

//Route for updating region
router.put("/update-region", upload.none(), async (req, res, next) => {
  try {
    const { name, id } = req.body;
    const region = await Region.findById(id);
    region.name = name;
    await region.save();

    return res.status(200).json({ message: "Region updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.delete(
  "/delete/:id",
  catchAsynchErrors(async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const region = await Region.findByIdAndDelete(id);
      console.log(region);

      // Respond with success message
      res.status(200).json({ message: "Successfully deleted the region" });
    } catch (error) {
      return next(new ErrorHandler(err.message, 400));
    }
  })
);
module.exports = router;
