const { Router } = require("express");
const refreshRouter = Router();
const jwt = require("jsonwebtoken");
const prisma = require("../lib/prisma");

refreshRouter.post("/", async (req, res) => {
  res.clearCookie("accessToken");

  try {
    const refreshToken = req.signedCookies["refreshToken"];
    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid No token" });
    }
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    const storedToken = await prisma.refreshToken.findFirst({
      where: {
        AND: { userId: decoded.id, token: refreshToken },
      },
      include: {
        user: true,
      },
    });
    if (
      !storedToken ||
      storedToken?.expiresAt < new Date() ||
      storedToken?.userId !== decoded.id
    ) {
      if (storedToken?.expiresAt < new Date()) {
        await prisma.refreshToken.delete({
          where: {
            userId: decoded.id,
            token: refreshToken,
          },
        });
      }
      return res.status(401).json({ success: false, message: "token expired" });
    }
    const safeUser = { ...storedToken.user };
    delete safeUser.password;
    const accessToken = jwt.sign(safeUser, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    res.cookie("accessToken", accessToken, {
      sameSite: "lax",
      secure: false,
      signed: true,
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    return res.status(200).json({ success: true });
  } catch (e) {
    if (e.name === "JsonWebTokenError" || e.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.error(`Server error ${e}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});
module.exports = refreshRouter;
