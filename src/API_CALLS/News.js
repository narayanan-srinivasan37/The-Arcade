import API from "./client";

export const getNews = async () => {
  try {
    const news = await API.get("/news");
    return news.data;
  } catch (err) {
    throw err;
  }
};
