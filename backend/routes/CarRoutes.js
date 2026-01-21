const express = require("express");
const router = express.Router();
const CarController = require("../controllers/CarController");

// Multer upload configuration
const { carUpload } = CarController;

// ========== CREATE ==========
router.post(
  "/add-car",
  carUpload.fields([
    { name: "car_image", maxCount: 1 },
    { name: "all_car_images", maxCount: 10 },
  ]),
  CarController.createCar
);

// ========== READ ==========
router.get("/all-added-cars", CarController.getAllCars);
router.get("/cars", CarController.getAllCars);
router.get("/get-single-added-car-by-id/:id", CarController.getCarById);
router.get("/get-car-by-slug/:slug", CarController.getCarBySlug); // New route for fetching car by slug

// ========== UPDATE ==========
router.put(
  "/update-car/:id",
  carUpload.fields([
    { name: "car_image", maxCount: 1 },
    { name: "all_car_images", maxCount: 10 },
  ]),
  CarController.updateCarById
);

// ========== DELETE ==========
router.delete("/delete-car/:id", CarController.deleteCarById);

// ========== COUNTS ==========
router.get("/count-all-cars", CarController.countAllCars);

// ========== SEARCH ==========
router.get("/search-cars", CarController.searchCars);

module.exports = router;