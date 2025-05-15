// server/controllers/event.controller.js
const asyncHandler = require("express-async-handler");
const mongoose     = require("mongoose"); 
const { Event, validateEvent } = require("../models/event.model");
const { Category } = require("../models/category.model");

/**
 * @desc    Create new event
 * @route   POST /api/v1/events
 * @access  Admin
 */
exports.createEvent = asyncHandler(async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { category: categoryId } = req.body;
  
  // 2) Verify category exists
  if (!mongoose.isValidObjectId(categoryId)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }
  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  let imageUrls = [];
  if (req.files && req.files.length) {
    imageUrls = req.files.map(f => f.path);  
  }

  const event = new Event({ 
    ...req.body, 
    images: imageUrls,
    // createdBy: req.userId 
  });
  await event.save();

  await event.populate("category", "name");

  res.status(201).json({ 
    success: true,
    message: "Event created successfully",
    event 
  });
});

/**
 * @desc    Get all events
 * @route   GET /api/v1/events
 * @access  Public
 */
exports.getEvents = asyncHandler(async (req, res) => {
  const { category, venue, minPrice, maxPrice, sortBy = "date", sortOrder = "asc" } = req.query;

  //filter
  const filter = {};
  if (category) {
    filter.category = category; 
  }

  if (venue) {
    filter.venue = { $regex: new RegExp(venue, "i") };
  }
  
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const total = await Event.countDocuments(filter);

  // Pagination 
  const curpage  = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.max(1, parseInt(req.query.limit) || 6);
  const skip  = (curpage - 1) * limit;
  
  // Sorting
  let sort = {};
  if (sortBy === "date") {
    sort.date = sortOrder === "desc" ? -1 : 1;
  } else if (sortBy === "price") {
    sort.price = sortOrder === "desc" ? -1 : 1;
  }

  const pages = Math.ceil(total / limit);

  const events = await Event.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate("category", "name");

  res.json({
    success: true, 
    events,
    meta: {
      total,
      pages,  
      curpage,    
      limit,   
    }
  });
});

/**
 * @desc    Get single event by ID
 * @route   GET /api/v1/events/:id
 * @access  Public
 */
exports.getEventById = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("category", "name");
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ 
    success: true, 
    event
  });
});

/**
 * @desc    Update an event
 * @route   PUT /api/v1/events/:id
 * @access  Admin
 */
exports.updateEvent = asyncHandler(async (req, res) => {
  if (req.body.images && !Array.isArray(req.body.images)) {
    req.body.images = [req.body.images];
  }
  
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { category: categoryId } = req.body;
  if (!mongoose.isValidObjectId(categoryId) || !await Category.exists({_id:categoryId})) {
    return res.status(400).json({ message: "Invalid or missing category" });
  }

  let imageUrls = req.body.images || []; 
  if (req.files && req.files.length) {
    imageUrls = imageUrls.concat(req.files.map(f => f.path));
  }
  
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images: imageUrls },
    { new: true, runValidators: true }
  ).populate("category", "name");

  if (!event){
    return res.status(404).json({ message: "Event not found" });
  } 

  res.json({ 
    success: true,
    event
    });
});

/**
 * @desc    Delete an event
 * @route   DELETE /api/v1/events/:id
 * @access  Admin
 */
exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json({ success: true, message: "Event deleted" });
});
