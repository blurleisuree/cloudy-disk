const Router = require("express");
const User = require("../models/User");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();

const router = new Router();

// Настройка multer для временного хранения файла в памяти (не на диске)
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  },
});

// Добавление Аватарки
router.post("/avatar", upload.single("avatar"), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id); // Предполагаю, что в decoded есть поле id
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Конвертируем файл в base64
    const base64Image = req.file.buffer.toString("base64");
    const dataUri = `data:${req.file.mimetype};base64,${base64Image}`;

    // Сохраняем base64-строку в базе данных
    user.avatar = dataUri;
    await user.save();

    return res.json({ message: "Фото загружено", avatar: user.avatar });
  } catch (e) {
    if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
});

module.exports = router;
