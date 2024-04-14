const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter the province name"],
      minlength: [2, "Province name must be at least 2 characters"],
      unique: true,
    },
    region: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region",
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
provinceSchema.index({ name: 1 });
module.exports = mongoose.model("Province", provinceSchema);
