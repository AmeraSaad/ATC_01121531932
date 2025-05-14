const express = require("express");
const upload = require("../middleware/upload");   
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
router.post("/", verifyAndAdminCheck,upload.array("images", 5), createEvent);
router.put("/:id", verifyAndAdminCheck,upload.array("images", 5), updateEvent);
router.delete("/:id", verifyAndAdminCheck, deleteEvent);

module.exports = router;
