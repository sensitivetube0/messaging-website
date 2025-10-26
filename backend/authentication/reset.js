const { Router } = require("express");
const resetRouter = Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { authenticateJSON } = require("./passport/authenticatePassport");
const prisma = require("../lib/prisma");
const validatePasswordChange = [
  body("newPassword")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Invalid length password must more than 8 characters long"),
  body("email").trim().isEmail().withMessage("Please provide a valid email"),
  body("currentPassword")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Invalid current password"),
];
const validateUsernameChange = [
  body("password").trim().isLength({ min: 1 }).withMessage("Invalid password"),
  body("newUsername")
    .trim()
    .isAlpha()
    .withMessage("Username must not contain special characters")
    .isLength({ min: 5, max: 30 })
    .withMessage("Username must be between 5 and 30 characters long"),
];
resetRouter.put("/password", [
  authenticateJSON("jwt"),
  ...validatePasswordChange,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Password input invalid",
        errors: errors.array(),
        success: false,
      });
    }
    try {
      const user = req.user;
      const { currentPassword, newPassword, email } = req.body;
      const userFromDB = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });
      if (!userFromDB) {
        return res
          .status(404)
          .json({ message: "No user found", success: false });
      }
      if (userFromDB.email !== email) {
        return res.status.json({ message: "Incorrect email", success: false });
      }
      const match = await bcrypt.compare(currentPassword, userFromDB.password);
      if (!match) {
        return res
          .status(401)
          .json({ message: "Incorrect password", success: false });
      }
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: newHashedPassword,
        },
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(`Error on server  ${e}`);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  },
]);

resetRouter.put("/username", [
  authenticateJSON("jwt"),
  ...validateUsernameChange,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Input invalid",
        errors: errors.array(),
        success: false,
      });
    }
    try {
      const { newUsername, password } = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
      });
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "No user found" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid Password" });
      }
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          username: newUsername,
        },
      });
      return res.status(200).json({ success: true });
    } catch (e) {
      console.error(`Server Error ${e}`);
    }
  },
]);
module.exports = resetRouter;
