const express = require("express");
const router = express.Router();
const {
    addReview,
    getAllReviews,
    updateReview,
    deleteReview,
    reviewUpload,
} = require("../controllers/ReviewController");

// Add a new review (with multiple photo uploads)
router.post("/review/add", reviewUpload, addReview);

// Get all reviews
router.get("/review/allreviews", getAllReviews);

// Update a review (with multiple photo uploads)
router.put("/review/update/:reviewId", reviewUpload, updateReview); // Ensure this route is correctly configured

// Delete a review
router.delete("/review/delete/:reviewId", deleteReview);

module.exports = router;