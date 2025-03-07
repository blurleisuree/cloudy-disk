const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

const corsMiddleware = require("./middleware/cors.middleware");
const authRouter = require("./routes/auth.routes");

const app = express();
const PORT = config.get("serverPort");

app.use(corsMiddleware);
app.use(express.json());
app.use("/api/auth", authRouter);

const start = async () => {
  try {
    const dbUrl = config.get("dbUrl");
    console.log("Попытка подключения к базе данных:", dbUrl);

    await mongoose.connect(dbUrl);
    console.log("Успешно подключено к MongoDB");

    app.listen(PORT, () => {
      console.log("Server started on port ", PORT);
    });
  } catch (e) {
    console.error("Ошибка при запуске сервера:", e);
    console.error("Полная ошибка:", e);
    process.exit(1);
  }
};

start();
