const passport = require("./passport");

function authenticateJSON(strategy, options = {}) {
  return function (req, res, next) {
    // Make the callback async so we can await DB lookups
    passport.authenticate(strategy, options, async (err, user, info) => {
      if (err) return next(err);

      if (!user) {
        const message =
          (info && (info.message || info)) || "Invalid credentials";
        return res.status(401).json({ message, authorized: false });
      }

      try {
        if (!user) {
          return res
            .status(401)
            .json({ authorized: false, message: "User not found" });
        }
        const safeUser = user;
        delete safeUser.password;
        req.user = safeUser;
        return next();
      } catch (e) {
        return next(e);
      }
    })(req, res, next);
  };
}

module.exports = { authenticateJSON };
