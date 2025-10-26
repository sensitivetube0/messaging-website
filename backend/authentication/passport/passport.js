const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const prisma = require("../../lib/prisma");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;

function cookieExtractor(req) {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies["accessToken"];
  }
  return token;
}
const jwtOpts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: process.env.ACCESS_TOKEN,
  ignoreExpiration: false,
};

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (username, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: {
            email: username,
          },
        });

        if (!user) {
          return done(null, false, { message: "Incorrect email" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err, false);
      }
    }
  )
);

passport.use(
  new JwtStrategy(jwtOpts, async function (jwt_payload, done) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: jwt_payload.id,
        },
      });
      if (!user) {
        return done(null, false, { message: "Error Finding user" });
      }
      return done(null, user);
    } catch (e) {
      console.error(`Error authenticating user ${e}`);
      return done(e, false);
    }
  })
);

module.exports = passport;
