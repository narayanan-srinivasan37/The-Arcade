const { response } = require("express");
const express = require("express");
const passport = require("passport");
const { getCartItems } = require("../Helper_Functions/CartItemFunctions");
const authRoutes = express.Router();
const {
  authenticateUser,
  createUser,
  findOneById,
  googleLogin,
} = require("../Helper_Functions/AuthFunctions");

authRoutes.get("/", (req, res) => {
  res.send("auth/api here");
});
authRoutes.post(
  "/login",

  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const response = await authenticateUser(email, password);
      req.session.userId = response.id;
      if (response) {
        res.status(200).send(response);
      }
    } catch (err) {
      next(err);
    }
  }
);

authRoutes.post("/register", async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    const newUser = await createUser(email, password, firstName, lastName);
    req.session.userId = newUser.id;
    console.log(newUser);
    if (newUser) res.status(201).send(newUser);
  } catch (err) {
    next(err);
  }
});
authRoutes.delete("/logout", async (req, res, next) => {
  try {
    req.logout();
    req.session.destroy();
    console.log("session");
    res.clearCookie("connect.sid").send("loggedout successfully");
  } catch (err) {
    next(err);
  }
});

authRoutes.get("/isloggedin", async (req, res, next) => {
  try {
    const user = await findOneById(req.session.userId);
    if (user !== undefined) {
      const cartItems = await getCartItems(req.session.userId);
      res.status(200).send({ user, cartItems });
    } else {
      err = {
        message: "Unauthorized",
        status: 401,
      };
      next(err);
    }
  } catch (err) {
    next(err);
  }
});
authRoutes.post("/google", async (req, res, next) => {
  try {
    const { token } = await req.body;
    const user = await googleLogin(token);
    req.session.userId = newUser.id;
    if (user) res.statusCode(201).send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = authRoutes;
