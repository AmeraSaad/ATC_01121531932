// controllers/category.controller.js
const asyncHandler = require("express-async-handler");
const { Category, validateCategory } = require("../models/category.model");

/**
 * @desc    Create a new category
 * @route   POST /api/v1/categories
 * @access  Admin
 */
exports.createCategory = asyncHandler(async (req, res) => {
  // 1) Validate input
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2) Check for duplicate
  const exists = await Category.findOne({ 
    name: new RegExp(`^${req.body.name.trim()}$`, "i")
  });
  if (exists) {
    return res.status(400).json({ message: "Category already exists" });
  }

  // 3) Create and return
  const category = await Category.create(req.body);
  res.status(201).json({ success: true, category });
});

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort("name");
  res.json({ success: true, categories });
});

/**
 * @desc    Get single category by ID
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
exports.getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }
  res.json({ success: true, category });
});

/**
 * @desc    Update a category
 * @route   PUT /api/v1/categories/:id
 * @access  Admin
 */
exports.updateCategory = asyncHandler(async (req, res) => {
  // 1) Validate input
  const { error } = validateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2) Update
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name.trim() },
    { new: true, runValidators: true }
  );

  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }

  res.json({ success: true, category });
});

/**
 * @desc    Delete a category
 * @route   DELETE /api/v1/categories/:id
 * @access  Admin
 */
exports.deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).json({ success: false, message: "Category not found" });
  }
  res.json({ success: true, message: "Category deleted" });
});
