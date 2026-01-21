const Car = require("../models/CarModel");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const carUploadDir = path.join("uploads", "cars");

if (!fs.existsSync(carUploadDir)) {
  fs.mkdirSync(carUploadDir, { recursive: true });
}

const carStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, carUploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const carUpload = multer({ storage: carStorage });
exports.carUpload = carUpload;

exports.createCar = async (req, res) => {
  try {
    const {
      car_name,
      slug,
      description,
      rental_price_per_day,
      brand,
      model,
      year,
      color,
      fuel_type,
      transmission,
      mileage,
      seating_capacity,
      availability_status,
      vendor,
      category,
      sub_category,
      tags,
      createdBy,
      updatedBy,
    } = req.body;

    const mainImage =
      req.files["car_image"]?.[0]?.path.replace(/\\/g, "/") || "";
    const galleryImages =
      req.files["all_car_images"]?.map((f) => f.path.replace(/\\/g, "/")) ||
      [];

    const newCar = new Car({
      car_name,
      slug,
      description,
      rental_price_per_day,
      car_image: mainImage,
      all_car_images: galleryImages,
      brand,
      model,
      year,
      color,
      fuel_type,
      transmission,
      mileage,
      seating_capacity,
      availability_status,
      vendor,
      category,
      sub_category,
      tags,
      createdBy,
      updatedBy,
    });

    const saved = await newCar.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Car Error:", error);
    res.status(500).json({ message: "Failed to create car." });
  }
};

exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find({ isDeleted: false });
    res.status(200).json(cars);
  } catch (error) {
    console.error("Get All Cars Error:", error);
    res.status(500).json({ message: "Failed to fetch cars." });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car || car.isDeleted) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Get Car By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch car." });
  }
};

exports.getCarBySlug = async (req, res) => {
  try {
    const car = await Car.findOne({ slug: req.params.slug, isDeleted: false });

    if (!car) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.status(200).json(car);
  } catch (error) {
    console.error("Get Car By Slug Error:", error);
    res.status(500).json({ message: "Failed to fetch car." });
  }
};

exports.updateCarById = async (req, res) => {
  try {
    const {
      car_name,
      slug,
      description,
      rental_price_per_day,
      brand,
      model,
      year,
      color,
      fuel_type,
      transmission,
      mileage,
      seating_capacity,
      availability_status,
      tags,
      updatedBy,
    } = req.body;

    const updatedFields = {
      car_name,
      slug,
      description,
      rental_price_per_day,
      brand,
      model,
      year,
      color,
      fuel_type,
      transmission,
      mileage,
      seating_capacity,
      availability_status,
      tags,
      updatedBy,
      updatedAt: Date.now(),
    };

    if (req.files) {
      if (req.files["car_image"] && req.files["car_image"][0]) {
        updatedFields.car_image = req.files["car_image"][0].path.replace(/\\/g, "/");
      }

      if (req.files["all_car_images"]) {
        updatedFields.all_car_images = req.files["all_car_images"].map((file) =>
          file.path.replace(/\\/g, "/")
        );
      }
    }

    const updated = await Car.findByIdAndUpdate(req.params.id, updatedFields, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Car not found." });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Car Error:", error);
    res.status(500).json({ message: "Failed to update car." });
  }
};

exports.deleteCarById = async (req, res) => {
  try {
    const deleted = await Car.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true }
    );
    if (!deleted)
      return res.status(404).json({ message: "Car not found." });
    res.status(200).json({ message: "Car deleted." });
  } catch (error) {
    console.error("Delete Car Error:", error);
    res.status(500).json({ message: "Failed to delete car." });
  }
};

exports.countAllCars = async (req, res) => {
  try {
    const count = await Car.countDocuments({ isDeleted: false });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Count failed" });
  }
};

exports.searchCars = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Query is required." });
    }

    // First try text search
    let cars = await Car.find(
      { $text: { $search: q }, isDeleted: false },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    // If no results, fallback to regex search on multiple fields
    if (cars.length === 0) {
      const regex = new RegExp(q, "i");
      cars = await Car.find({
        isDeleted: false,
        $or: [
          { car_name: regex },
          { brand: regex },
          { model: regex },
          { description: regex },
          { tags: regex }
        ]
      });
    }

    res.status(200).json(cars);
  } catch (error) {
    console.error("Search Cars Error:", error);
    res.status(500).json({ message: "Failed to search cars." });
  }
};