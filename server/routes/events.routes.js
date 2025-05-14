const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/events.controller");
const { verifyAndAdminCheck } = require("../middleware/verifyToken");

// Public
router.get("/", getEvents);
router.get("/:id", getEventById);

// Admin only
router.post("/", verifyAndAdminCheck, createEvent);
router.put("/:id", verifyAndAdminCheck, updateEvent);
router.delete("/:id", verifyAndAdminCheck, deleteEvent);

module.exports = router;
