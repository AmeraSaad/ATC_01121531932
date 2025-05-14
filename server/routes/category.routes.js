// routes/category.routes.js
const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const { verifyAndAdminCheck } = require("../middleware/verifyToken");

// Public routes
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Admin-only routes
router.post("/", verifyAndAdminCheck, createCategory);
router.put("/:id", verifyAndAdminCheck, updateCategory);
router.delete("/:id", verifyAndAdminCheck, deleteCategory);

module.exports = router;
