const express = require('express');
const helmet = require("helmet");
const cors = require('cors');
require("dotenv").config();
const mongoose = require("mongoose");  
const connectDB = require("./db/connectDB");
const { notFound, errorHanlder } = require("./middleware/errors");
const cookieParser = require('cookie-parser');
const authRoutes = require("./routes/auth.routes");
const eventRoutes = require("./routes/events.routes");
const categoryRoutes = require("./routes/category.routes");
const bookingRoutes = require('./routes/booking.routes');

const app = express();

// Middleware
app.use(express.json()); 
app.use(cookieParser());

app.use(helmet());

app.use(cors({ origin: process.env.CLIENT_URL , credentials: true }));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/bookings", bookingRoutes);

app.get("/api/test-mongo", async (req, res) => {
  try {
    // Try a lightweight operation—this will reuse your mongoose connection pool
    await mongoose.connection.db.admin().ping();
    return res.json({ ok: true, msg: "MongoDB is reachable" });
  } catch (err) {
    console.error("MongoDB ping failed:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
});

// Error Hanlder Middleware
app.use(notFound);
app.use(errorHanlder);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
