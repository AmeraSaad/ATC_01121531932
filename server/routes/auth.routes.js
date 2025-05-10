const express = require("express");
const router = express.Router();
const { signup , verifyEmail , logout, login , forgotPassword , resetPassword ,protectRoute } = require("../controllers/auth.controller");
const { verifyTokenAndUserCheck } = require("../middleware/verifyToken");

router.get("/check-auth", verifyTokenAndUserCheck ,protectRoute); 

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/verify-email", verifyEmail);

router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);

// router.get("/refresh", (req, res) => {
//   res.send("Refresh route");
// });

module.exports = router;