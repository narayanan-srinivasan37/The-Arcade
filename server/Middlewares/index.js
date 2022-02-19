const expressLoader = require("./express");
const initialisePassport = require("./passport");


module.exports = (app) => {
  expressLoader(app);
  initialisePassport(app);
};
