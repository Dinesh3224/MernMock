const express = require("express");
const {
  brandUpload,
  addBrand,
  getAllBrands,
} = require("../controllers/BrandController");

const router = express.Router();

// Route to add a new brand
router.post(
  "/add-brand",
  brandUpload.fields([{ name: "image", maxCount: 1 }]),
  addBrand
);

// Route to get all brands
router.get("/brands", getAllBrands);

module.exports = router;
