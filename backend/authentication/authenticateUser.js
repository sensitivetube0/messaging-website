const { Router } = require("express");
const authenticateRouter = Router();

authenticateRouter.get("/", (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
});

module.exports = authenticateRouter;
