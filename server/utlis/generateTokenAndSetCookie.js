const  jwt =  require("jsonwebtoken")

module.exports.generateTokenAndSetCookie = (res, userId ,isAdmin) => {
	const token = jwt.sign({ userId, isAdmin }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

	res.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};