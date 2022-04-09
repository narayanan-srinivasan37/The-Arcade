import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findBlogById } from "../../ReduxStore/Reducers/BlogReducer";
import { useParams } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import BlogView from "../../Component/Blog/BlogView/BlogView";
const BlogViewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { blog, isLoading, error } = useSelector((state) => state.blog);
  useEffect(() => {
    async function fetchData() {
      await dispatch(findBlogById(id));
    }
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return (
      <ComponentLayout>
        <Loader />
      </ComponentLayout>
    );
  }
  const NoBlogData = () => {
    return <p>No Blog Available</p>;
  };

  return (
    <ComponentLayout>
      {blog.length ? <BlogView blog={blog} /> : <NoBlogData />}
    </ComponentLayout>
  );
};

export default BlogViewPage;
