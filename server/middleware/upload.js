// middleware/upload.js
const multer  = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utlis/cloudinary");

// Define storage: files go directly to Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "event-images",      // Cloudinary folder
    allowed_formats: ["jpg","jpeg","png","webp"],
    transformation: [{ width: 800, height: 600, crop: "limit" }]
  }
});

// Only allow image files, max 5 per event
const parser = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max per file
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  }
});

module.exports = parser;
