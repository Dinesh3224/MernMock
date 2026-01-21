const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  brand_name: { type: String, required: true, unique: true },
  image: { type: String, required: true }, // e.g., logo or banner
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

brandSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
