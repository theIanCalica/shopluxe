const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the city name"],
      minlength: [2, "City name must be at least 2 characters"],
      unique: true,
    },
    province: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Province",
    },
  },
  {
    timestamps: true,
  }
);

citySchema.index({ name: 1 });
module.exports = mongoose.model("City", citySchema);