const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the region name"],
      minlength: [2, "Region name must be at least 2 characters"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Region", regionSchema);