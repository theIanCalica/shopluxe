const express = require("express");
const router = express.Router();
const Province = require("../model/province");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const multer = require("multer");
const upload = multer();

router.post(
  "/create-province",
  upload.none(),
  catchAsynchErrors(async (req, res, next) => {
    try {
      const { name, regionID } = req.body;
      const existingProvince = await Region.findOne({ name, regionID });
      if (existingProvince) {
        return next(new ErrorHandler("Province already exists", 400));
      }

      const newProvince = new Province({
        name: name,
        regionID: regionID,
      });

      await newProvince.save();
      return res.status(201).json({ message: "Region created successfully" });
    } catch (err) {
      return next(new ErrorHandler(err.message, 400));
    }
  })
);

//Get all provinces
router.get(
  "provinces-list",
  catchAsynchErrors(async (req, res, next) => {
    try {
      const provinces = await Province.find().sort({ name: 1 });
      res.json(provinces);
    } catch (err) {
      res.status(500).json({ message: error.message });
    }
  })
);

//Route for updating provinces
router.put("/update-province", upload.none(), async (req, res, next) => {
  try {
    const { name, id, regionID } = req.body;
    const province = await Province.findById(id);
    province.name = name;
    provicne.regionID = regionID;
    await province.save();
    return res.status(200).json({ message: "Region updated successfully" });
  } catch (error) {
    return next(new ErrorHandler(err.message, 400));
  }
});

router.delete(
  "/delete-province",
  catchAsynchErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      const province = await Province.findByIdAndDelete(id);
      console.log(province);
      res.status(200).json({ message: "Successfully deleted the region" });
    } catch (error) {
      return next(new ErrorHandler(err.message, 400));
    }
  })
);
module.exports = router;
