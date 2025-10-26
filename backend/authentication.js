const prisma = require("./lib/prisma.js");
require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);
require("./authentication/passport/passport.js");
const passport = require("passport");
const {
  authenticateJSON,
} = require("./authentication/passport/authenticatePassport.js");
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
const signupRouter = require("./authentication/signup.js");
const loginRouter = require("./authentication/login.js");
const refreshRouter = require("./authentication/refresh.js");
const logoutRouter = require("./authentication/logout.js");
const resetRouter = require("./authentication/reset.js");
const authenticateRouter = require("./authentication/authenticateUser");

app.use("/refresh", refreshRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/reset", resetRouter);
app.use("/me", authenticateJSON("jwt"), authenticateRouter);
app.listen(4000, (error) => {
  if (error) {
    console.error(error);
  }
  console.log("LISTENING ON PORT 4000");
});
