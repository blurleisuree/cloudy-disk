const Router = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { check, validationResult } = require("express-validator");
const router = new Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const generateCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

router.post(
  "/registration",
  [
    check("email", "Uncorrect email").isEmail(),
    check(
      "password",
      "Password must be longer than 3 and shorter than 12"
    ).isLength({ min: 3, max: 12 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Uncorrect request", errors });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res
          .status(400)
          .json({ message: `User with ${email} already exists` });
      }

      const hashPassword = await bcrypt.hash(password, 8);
      const verificationCode = generateCode();

      const user = new User({
        email,
        password: hashPassword,
        isVerified: false,
        verificationCode: verificationCode,
      });
      await user.save();

      await transporter.sendMail({
        from: `cloudydisk.com ${process.env.SMTP_EMAIL}`,
        to: email,
        subject: "Подтверждение регистрации",
        html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2 style="color: #333;">Подтвердите ваш email</h2>
          <p>Ваш код подтверждения:</p>
          <h3 style="color: #007bff;">${verificationCode}</h3>
          <p>Введите этот код в приложении, чтобы завершить регистрацию.</p>
          <p>Если вы не запрашивали код, просто проигнорируйте это письмо.</p>
          <hr/>
          <p style="font-size: 12px; color: #888;">Cloudy Disk, 2025</p>
        </div>
      `,
      });

      return res.json({ message: "User was created" });
    } catch (e) {
      console.log(e);
      res.send({ message: "Server error:", e });
    }
  }
);

router.post("/verify", async (req, res) => {
  try {
    const { code, email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Wrong email" }); // Если нет юзера по этой почте
    }

    const isCodeValid = code === user.verificationCode;
    if (!isCodeValid) {
      return res.status(404).json({ message: "Invalid code" });
    }

    user.isVerified = true;
    user.verificationCode = null; // Удаляем код
    await user.save();

    res.json({ message: "Почта успешно подтверждена" });
  } catch {
    console.log(e);
    res.send({ message: "Ошибка отправки кода", e });
  }
});

router.post("/resend-code", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Wrong email" }); // Если нет юзера по этой почте
    }

    const newCode = generateCode(); // Создаем новый код
    user.verificationCode = newCode;
    user.verificationExpires = new Date(Date.now() + 10 * 60 * 1000); // +10 минут
    await user.save();

    // Отправляем письмо с новым кодом
    await transporter.sendMail({
      from: `cloudydisk.com ${process.env.SMTP_EMAIL}`,
      to: email,
      subject: "Новый код подтверждения",
      html: `
      <div style="font-family: Arial, sans-serif; text-align: center;">
        <h2 style="color: #333;">Подтвердите ваш email</h2>
        <p>Ваш код подтверждения:</p>
        <h3 style="color: #007bff;">${newCode}</h3>
        <p>Введите этот код в приложении, чтобы завершить регистрацию.</p>
        <p>Если вы не запрашивали код, просто проигнорируйте это письмо.</p>
        <hr/>
        <p style="font-size: 12px; color: #888;">Cloudy Disk, 2025</p>
      </div>
    `,
    });

    res.json({ message: "Новый код отправлен" });
  } catch (e) {
    console.log(e);
    res.send({ message: "Ошибка отправки кода", e });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body; // Те данные которые приходят на сервер

    const user = await User.findOne({ email }); // Ищем пользователя по email
    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Если нет юзера ответ erorr
    }

    const isPassValid = bcrypt.compareSync(password, user.password); // сравнивает зашифрованный пароль с незашифрованным
    if (!isPassValid) {
      return res.status(404).json({ message: "Invalid password" });
    }

    const isVerified = user.isVerified;
    if (!isVerified) {
      return res.status(403).json({ message: "Подтвердите email для входа" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
      },
    });
  } catch (e) {
    console.log(e);
    res.send({ message: "Server error", e });
  }
});

// router.post("/forgot-password", async (req, res) => {
//   try {
//     const { email } = req.body; // Те данные которые приходят на сервер

//     const user = await User.findOne({ email }); // Ищем пользователя по email
//     if (!user) {
//       return res.status(404).json({ message: "User not found" }); // Если нет юзера ответ erorr
//     }
// });


router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ userId: user._id, email: user.email });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error", e });
  }
});

module.exports = router;
