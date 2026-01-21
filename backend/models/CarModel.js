const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  car_name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  car_image: { type: String, required: false },
  all_car_images: [{ type: String }],
  description: { type: String, required: true },
  rental_price_per_day: { type: Number, required: true },
  brand: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  year: { type: Number, required: true },
  color: { type: String, trim: true },
  fuel_type: { type: String, enum: ["Petrol", "Diesel", "Electric", "Hybrid"], required: true },
  transmission: { type: String, enum: ["Manual", "Automatic"], required: true },
  mileage: { type: Number, required: true },
  seating_capacity: { type: Number, required: true },
  availability_status: { type: Boolean, default: true },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  sub_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  ratings: { type: Number, default: 0 },
  avg_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  tags: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

carSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

carSchema.index({ car_name: "text", tags: "text", brand: "text", model: "text", description: "text" });

const Car = mongoose.model("Car", carSchema);
module.exports = Car;