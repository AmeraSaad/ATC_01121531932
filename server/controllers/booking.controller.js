const asyncHandler = require("express-async-handler");
const mongoose     = require("mongoose");
const { Booking }  = require("../models/booking.model");
const { Event }    = require("../models/event.model");

/**
 * @desc    Book exactly one ticket for an event (once per user)
 * @route   POST /api/v1/bookings
 * @access  User
 */
exports.bookEvent = asyncHandler(async (req, res) => {
  const userId  = req.userId;
  const { eventId } = req.body;

  // Validate eventId
  if (!mongoose.isValidObjectId(eventId)) {
    return res.status(400).json({ message: "Invalid event ID" });
  }

  // Ensure event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  // Prevent duplicate booking
  const existing = await Booking.findOne({ user: userId, event: eventId });
  if (existing) {
    return res.status(400).json({ message: "You have already booked this event" });
  }

  const booking = await Booking.create({
    user: userId,
    event: eventId,
  });

  await booking.populate("event", "name date venue price images");

  res.status(201).json({
    success: true,
    message: "Event booked successfully",
    booking
  });
});

/**
 * @desc    Get all bookings for the logged-in user
 * @route   GET /api/v1/bookings/me
 * @access  User
 */
exports.getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const bookings = await Booking.find({ user: userId })
    .sort({ bookedAt: -1 })
    .populate("event", "name date venue price images");

  res.json({
    success: true,
    bookings
  });
});

/**
 * @desc    Cancel (delete) a booking
 * @route   DELETE /api/v1/bookings/:id
 * @access  User
 */
exports.cancelBooking = asyncHandler(async (req, res) => {
  const userId    = req.userId;
  const bookingId = req.params.id;

  // Validate bookingId
  if (!mongoose.isValidObjectId(bookingId)) {
    return res.status(400).json({ message: "Invalid booking ID" });
  }

  // Only allow the user to cancel
  const booking = await Booking.findOneAndDelete({
    _id: bookingId,
    user: userId
  });

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  res.json({
    success: true,
    message: "Booking canceled"
  });
});

/**
 * @desc    Get all bookings (admin)
 * @route   GET /api/v1/bookings
 * @access  Admin
 */
exports.getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find()
    .populate({ path: 'event', select: 'name date venue price' })
    .populate({ path: 'user', select: 'username email' })
    .sort('-bookedAt');
  res.json({ success: true, data: bookings });
});
