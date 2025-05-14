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

  const event = new Event({ 
    ...req.body, 
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
  
  const events = await Event.find().sort("date");
  res.json({
    success: true, 
    events
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

  const event = await Event.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
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
