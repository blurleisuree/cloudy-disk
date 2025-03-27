const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    if (!process.env.SECRET_KEY) throw new Error("SECRET_KEY is not defined");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (e) {
    if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.error("Auth error:", e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

module.exports = authMiddleware