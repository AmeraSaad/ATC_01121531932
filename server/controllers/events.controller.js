// server/controllers/event.controller.js
const asyncHandler = require("express-async-handler");
const { Event, validateEvent } = require("../models/event.model");

/**
 * @desc    Create new event
 * @route   POST /api/v1/events
 * @access  Admin
 */
exports.createEvent = asyncHandler(async (req, res) => {
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });


  let imageUrls = [];
  if (req.files && req.files.length) {
    imageUrls = req.files.map(f => f.path);  // `path` is Cloudinary URL
  }

  const event = new Event({ 
    ...req.body, 
    images: imageUrls,
    // createdBy: req.userId 
  });
  await event.save();
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
    filter.category = { $regex: new RegExp(category, "i") };
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

  const events = await Event.find(filter).sort(sort).skip(skip).limit(limit);
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
  const event = await Event.findById(req.params.id);
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
  const { error } = validateEvent(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

   // 2) Handle new uploads
  let imageUrls = req.body.images || []; 
  if (req.files && req.files.length) {
     // append new uploads
    imageUrls = imageUrls.concat(req.files.map(f => f.path));
  }

   // 3) Update the event
  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { ...req.body, images: imageUrls },
    { new: true, runValidators: true }
  );

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
