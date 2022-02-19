const LocalStrategy = require("passport-local").Strategy;
const passport = require('passport');
const bcrypt = require("bcrypt");
const pool = require("../db");
const { authenticateUser } = require("../Helper_Functions/AuthFunctions");

const initialisePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, { id });
  });

  passport.use(
    new LocalStrategy(async (email, password, done) => {
      try {
        const user = await authenticateUser(email, password);
        done(null, user);
      } catch (err) {
        done(err);
      }
    })
  );
  return passport;
};

module.exports = initialisePassport;
