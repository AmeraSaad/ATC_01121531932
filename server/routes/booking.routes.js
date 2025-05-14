const express = require('express');
const router = express.Router();
const {
  bookEvent,
  getUserBookings,
  getAllBookings,
  cancelBooking,
} = require('../controllers/booking.controller');
const { verifyTokenAndUserCheck, verifyAndAdminCheck } = require("../middleware/verifyToken");

// User routes
router.post('/', verifyTokenAndUserCheck, bookEvent);
router.get('/me', verifyTokenAndUserCheck, getUserBookings);
router.delete("/:id",verifyTokenAndUserCheck, cancelBooking);

// // Admin route
router.get('/', verifyAndAdminCheck, getAllBookings);

module.exports = router;