const rss_feed_url = "https://www.gamespot.com/feeds/game-news";
const playstation_rss_feed = "https://blog.playstation.com/feed/";
const corsUrl = `https://api.rss2json.com/v1/api.json?rss_url=`;
const axios = require("axios");
const { convert } = require("html-to-text");

function convertToPlain(html) {
  var htmltext = convert(html, {
    selectors: [
      {
        selector: "a",
        options: {
          noAnchorUrl: true,
          hideLinkHrefIfSameAsText: true,
          linkBrackets: false,
          ignoreHref:true
        },
      },
    ],
    limits: {
      maxChildNodes: 5,
    },
  });
  const replacedstring = htmltext.replace(/[^a-zA-Z0-9-,"'. ]/g, " ");
  return replacedstring;
}

async function getGamespotNews() {
  try {
    const response = await axios.get(`${corsUrl}${rss_feed_url}`);
    const data = await response.data;
    const items = await data.items;

    const mapData = items.map((item, index) => {
      return {
        author: item.author,
        description: convertToPlain(item.description),
        enclosure: item.enclosure,
        title: item.title,
        link: item.link,
        courtesy: "Gamespot",
      };
    });
    return mapData;
  } catch (err) {
    throw Error(err);
  }
}

async function getPS4News() {
  try {
    const response = await axios.get(`${corsUrl}${playstation_rss_feed}`);
    const data = await response.data;
    const items = await data.items;
    const mapData = items.map((item, index) => {
      return {
        author: item.author,
        description: convertToPlain(item.description),
        enclosure: { link: item.thumbnail, type: "image" },
        title: item.title,
        link: item.link,
        courtesy: "Playstation",
      };
    });
    return mapData;
  } catch (err) {
    throw err;
  }
}
module.exports = { getGamespotNews, getPS4News };
