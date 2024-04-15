const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const ErrorHandler = require("../utils/ErrorHandler");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const catchAsynchErrors = require("../middleware/catchAsynchErrors");
const sendToken = require('../utils/jwtToken');

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  try {
    const { fname, lname, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log(err);
          res.status(500).json({ message: "Error deleting file" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);


    const user = {
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      avatar: fileUrl,
    };
    const activationToken = createActivationToken(user);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Activate your Account",
        message: `Hello ${
          user.fname + " " + user.lname
        }, please click on the link to activate your account : ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `Please check your email ${user.email} to activate your account`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }

    
    const newUser = new User({
      fname: fname,
      lname: lname,
      email: email,
      password: password,
      avatar: fileUrl,
    });
    await newUser.save();

    // console.log("User created:", user);
    // res.status(201).json({ success: true, user });
  } catch (error) {
    return next(error);
  }
});

//Create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "5m",
  });
};

// Activate user route
router.post(
  "/activation",
  catchAsynchErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid Token", 400));
      }

      // Update user status to activated
      await User.findOneAndUpdate(
        { email: newUser.email },
        { activated: true }
      );
      
      sendToken(newUser, 201, res);
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  })
);

module.exports = router;
