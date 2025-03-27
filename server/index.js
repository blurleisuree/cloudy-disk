const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const helmet = require("helmet");

const corsMiddleware = require("./middleware/cors.middleware");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json({ limit: "10mb" }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const start = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL;
    console.log("Попытка подключения к базе данных:", dbUrl);

    await mongoose.connect(dbUrl)
    console.log("Успешно подключено к MongoDB");

    app
      .listen(PORT, () => {
        console.log("Server started on port ", PORT);
      })
      .on("error", (err) => {
        if (err.code === "EADDRINUSE") {
          console.error(`Port ${PORT} is already in use`);
          process.exit(1);
        }
      });
  } catch (e) {
    console.error("Ошибка при запуске сервера:", e);
    console.error("Полная ошибка:", e);
    process.exit(1);
  }
};

start();
