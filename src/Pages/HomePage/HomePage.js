import React, {useEffect} from "react";
import "./HomePage.css";
import NewsPage from "../NewsPage/NewsPage";
import Loader from "../../Component/Loader/Loader";

const HomePage = () => {
  return (
    <div>
      <NewsPage />
    </div>
  );
};

export default HomePage;
