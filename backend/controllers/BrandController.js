const Brand = require("../models/BrandModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Multer config for brand image upload
const brandStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/brands";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

const brandUpload = multer({ storage: brandStorage });

// ✅ Add new brand
const addBrand = async (req, res) => {
  try {
    const { brand_name } = req.body;

    const image = req.files?.["image"]?.[0]?.path.replace(/\\/g, "/") || "";

    if (!brand_name || !image) {
      return res.status(400).json({ error: "Brand name and image are required" });
    }

    // ✅ Moved this inside the async function
    const existingBrand = await Brand.findOne({ brand_name });
    if (existingBrand) {
      return res.status(409).json({ error: "Brand already exists" });
    }

    const newBrand = new Brand({
      brand_name,
      image,
    });

    await newBrand.save();

    res.status(201).json({ message: "Brand added successfully", brand: newBrand });
  } catch (error) {
    console.error("Error adding brand:", error);
    res.status(500).json({ error: "Server error while adding brand" });
  }
};

// Get all brands
const getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find().lean();

    const modifiedBrands = brands.map((brand) => {
      if (brand.image) {
        brand.image = `${req.protocol}://${req.get("host")}/${brand.image}`;
      }
      return brand;
    });

    res.status(200).json(modifiedBrands);
  } catch (error) {
    console.error("Error fetching brands:", error);
    res.status(500).json({ error: "Server error while fetching brands" });
  }
};

module.exports = {
  brandUpload,
  addBrand,
  getAllBrands,
};
