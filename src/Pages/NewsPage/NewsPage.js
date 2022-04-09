import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getallNews } from "../../ReduxStore/Reducers/NewsReducer";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import NewsComponent from "../../Component/NewsComponent/NewsComponent";
import "./NewsPage.css";
import Loader from "../../Component/Loader/Loader";
const NewsPage = () => {
  var [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { news, error, isLoading } = useSelector((state) => state.news);
  useEffect(() => {
    const getAllNews = async () => {
      try {
        await dispatch(getallNews());
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    getAllNews();
  }, []);

  if (isLoading) {
    return (
      <ComponentLayout>
        <Loader />
      </ComponentLayout>
    );
  }

  return (
    <ComponentLayout>
      {loading ? (
        <Loader />
      ) : (
        news.map((data, index) => {
          return <NewsComponent key={index} data={data} />;
        })
      )}
    </ComponentLayout>
  );
};

export default NewsPage;
