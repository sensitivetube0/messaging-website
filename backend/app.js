require("dotenv").config();
const path = require("node:path");
const express = require("express");
const app = express();
const flash = require("express-flash");
require("./authentication/passport/passport");
require("./authentication/passport/passport.js");
const passport = require("passport");
const {
  authenticateJSON,
} = require("./authentication/passport/authenticatePassport");
const rateLimit = require("express-rate-limit");

const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:4173"],
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per window
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(passport.initialize());
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE_SECRET));

const friendsRouter = require("./routes/friendRouter");
const messagesRouter = require("./routes/messagesRouter");

app.use("/friends", authenticateJSON("jwt"), friendsRouter);
app.use("/messages", authenticateJSON("jwt"), messagesRouter);

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
