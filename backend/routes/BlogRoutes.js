const express = require("express");
const {
  blogUpload,
  addBlog,
  getAllBlogs,
  getBlogById,
} = require("../controllers/BlogController");

const router = express.Router();

// Add a new blog
router.post("/blog/add-blog", blogUpload.single("featuredImage"), addBlog);

// Fetch all blogs
router.get("/blog/all-blogs", getAllBlogs);

// Fetch a single blog by ID
router.get("/blog/single-blogs/:id", getBlogById);

module.exports = router;
