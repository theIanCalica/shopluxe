const express = require("express");
const router = express.Router();
const City = require("../model/city");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const multer = require("multer");
const upload = multer();

//Route for create
router.post(
  "/create-province",
  upload.none(),
  catchAsynchErrors(async (req, res, next) => {
    try {
      const { name, provinceID } = req.body;
      const existingCity = await City.findOne({ name, provinceID });
      if (existingCity) {
        return next(new ErrorHandler("Province already exists", 400));
      }

      const newCity = new City({
        name: name,
        provinceID: provinceID,
      });

      await newCity.save();
      return res.status(201).json({ message: "Region created successfully" });
    } catch (error) {
      return next(new ErrorHandler(err.message, 400));
    }
  })
);

//Route for getting all the cities
router.get(
  "cities-list",
  catchAsynchErrors(async (req, res, next) => {
    try {
      const cities = await City.find().sort({ name: 1 });
      res.json(cities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);
