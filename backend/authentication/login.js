const { Router } = require("express");
const loginRouter = Router();
const { authenticateJSON } = require("./passport/authenticatePassport");
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

loginRouter.post("/", authenticateJSON("local"), async (req, res) => {
  try {
    const deleteIfTokenExists = await prisma.refreshToken.deleteMany({
      where: {
        userId: req.user.id,
      },
    });
    const accessToken = jwt.sign(req.user, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    const refreshToken = jwt.sign(req.user, process.env.REFRESH_TOKEN, {
      expiresIn: "30d",
    });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      signed: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      signed: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    await prisma.refreshToken.create({
      data: {
        token: refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: req.user.id,
      },
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    console.error(`Error logging in ${e}`);
    return res.status(500).json({
      success: false,
      message: "Server Error sorry for the inconvenience",
    });
  }
});
module.exports = loginRouter;
