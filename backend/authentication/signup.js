const prisma = require("../lib/prisma");
const { Router } = require("express");
const signupRouter = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { body, validationResult } = require("express-validator");
const validateInput = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Invalid length password must more than 8 characters long"),
  body("username")
    .trim()
    .isAlpha()
    .withMessage("Username must not contain special characters")
    .isLength({ min: 5, max: 30 })
    .withMessage("Username must be between 5 and 30 characters long"),
  body("email").trim().isEmail().withMessage("Invalid email format"),
];

signupRouter.post("/", [
  ...validateInput,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Invalid Input",
        errors: errors.array(),
      });
    }
    try {
      const { username, email, password } = req.body;
      if (!username || !email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Field Missing" });
      }
      const [usernameInUse, emailInUse] = await Promise.all([
        prisma.user.findUnique({
          where: {
            username: username,
          },
        }),
        prisma.user.findUnique({
          where: {
            email: email,
          },
        }),
      ]);
      if (emailInUse && usernameInUse) {
        return res
          .status(400)
          .json({ success: false, message: "Username and email in use" });
      }
      if (emailInUse) {
        return res
          .status(400)
          .json({ success: false, message: "Email In use" });
      }
      if (usernameInUse) {
        return res
          .status(400)
          .json({ success: false, message: "Username In use" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          username: username,
          email: email,
          password: hashedPassword,
        },
      });
      const safeUser = { ...user };
      delete safeUser.password;
      const accessToken = jwt.sign(safeUser, process.env.ACCESS_TOKEN, {
        expiresIn: "15m",
      });
      const refreshToken = jwt.sign(safeUser, process.env.REFRESH_TOKEN, {
        expiresIn: "30d",
      });
      res.cookie("accessToken", accessToken, {
        signed: true,
        sameSite: "lax",
        httpOnly: false,
        secure: true,
        maxAge: 15 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        signed: true,
        sameSite: "lax",
        secure: false,
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      await prisma.refreshToken.create({
        data: {
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          token: refreshToken,
          userId: user.id,
        },
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(`Error signing up ${e}`);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  },
]);
module.exports = signupRouter;
