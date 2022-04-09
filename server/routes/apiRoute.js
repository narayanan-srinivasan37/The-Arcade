const authRoutes = require("./AuthRoutes");
const blogRoutes = require("./BlogRoutes");
const newsRoutes = require("./NewsRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const productRoutes = require("./ProductRoutes");
const paymentRoutes = require("./PaymentRoutes");

const apiRoute = require("express").Router();
const app = require("express")();

apiRoute.use("/auth", authRoutes);
apiRoute.use("/blog", blogRoutes);
apiRoute.use("/news", newsRoutes);
apiRoute.use("/payment", paymentRoutes);
apiRoute.use("/product", productRoutes);
apiRoute.use("/cart", cartRoutes);
apiRoute.use("/order", orderRoutes);
module.exports = apiRoute;
