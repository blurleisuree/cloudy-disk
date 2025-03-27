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
    console.log('File rejected:'); // Лог при отклонении
  },
});

// Обёртка для upload.single с обработкой ошибок
const uploadMiddleware = (req, res, next) => {
  upload.single("avatar")(req, res, (err) => {
    if (err) {
      console.log('Upload middleware error:', err.message); // Лог для отладки
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          res.status(400).json({ message: "File too large. Max size is 5MB." });
          return; // Завершаем ответ
        }
        res.status(500).json({ message: "File upload error" });
        return; // Завершаем ответ
      }
      if (err.message === "Only images (jpeg, jpg, png) are allowed") {
        res.status(400).json({ message: err.message });
        return; // Завершаем ответ
      }
      res.status(500).json({ message: "Unexpected error", error: err.message });
      return; // Завершаем ответ
    }
    next(); // Если ошибок нет, переходим дальше
  });
};

// Добавление Аватарки
router.post(
  "/avatar",
  uploadMiddleware,
  async (req, res) => {
    console.log('Reached main handler'); // Лог для проверки
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
      console.error('Main handler error:', e);
      res.status(500).json({ message: "Server error", error: e.message });
    }
  }
);

module.exports = router;
