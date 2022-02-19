const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const { SESSION_SECRET } = require("../config");
module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        maxAge: 8 * 60 * 60 * 1000,
      },
    })
  );
  return app;
};
