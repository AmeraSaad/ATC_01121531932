const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  bookedAt: {
    type: Date,
    default: Date.now,
  }
}, { timestamps: true });

// Prevent the same user booking the same event twice
bookingSchema.index({ user: 1, event: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = { Booking };
