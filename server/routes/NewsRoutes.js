const newsRoutes = require("express").Router();
const {
  getGamespotNews,
  getPS4News,
} = require("../Helper_Functions/NewsFunction");

newsRoutes.get("/", async (req, res, next) => {
  try {
    const gamespotNews = await getGamespotNews();
    const ps4News = await getPS4News();
    const response = [...gamespotNews];
    res.status(200).send(response);
  } catch (err) {
    next(err);
  }
});

module.exports = newsRoutes;
