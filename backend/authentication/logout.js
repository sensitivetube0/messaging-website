const { Router } = require("express");
const logoutRouter = Router();
const { authenticateJSON } = require("./passport/authenticatePassport");
const prisma = require("../lib/prisma");

logoutRouter.post("/", authenticateJSON("jwt"), async (req, res) => {
  try {
    const refreshToken = req.signedCookies["refreshToken"];
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken", { path: "/refresh" });
    await prisma.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (e) {
    if (e.code === "P2025") {
      // Prisma "Record not found" error
      return res.status(200).json({
        success: true,
        message: "Logged out successfully",
      });
    }
    console.error(`Error on server ${e}`);
    return res.status(500).json({ message: "Server error", success: false });
  }
});

module.exports = logoutRouter;
