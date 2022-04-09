const express = require("express");
const expressLoader = require("./Middlewares/express");
const initialisePassport = require("./Middlewares/passport");
const app = express();
const { PORT } = require("./config");
const loader = require("./Middlewares");
const apiRoute = require("./routes/apiRoute");
const startServer = async () => {
  expressLoader(app)
  initialisePassport(app);
  app.use("/api", apiRoute);

  app.use((err, req, res, next) => {
    const { message, status } = err;
    return res
      .status(status || 500)
      .send({ message: message || "Internal server Error " });
  });
  app.listen(parseInt(PORT), () => {
    console.log(`listening at port ${PORT} `);
  });
};
startServer();
