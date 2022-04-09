import React, { useEffect } from "react";
import BlogHome from "../../Component/Blog/BlogHome/BlogHome";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../ReduxStore/Reducers/BlogReducer";
import Loader from "../../Component/Loader/Loader";
const BlogPage = () => {
  const dispatch = useDispatch();
  const { blog, isLoading, error } = useSelector((state) => state.blog);
  useEffect(() => {
    async function fetchBlog() {
      await dispatch(allBlogs());
    }
    fetchBlog();
  }, [dispatch]);
  if (isLoading) {
    return (
      <ComponentLayout>
        <Loader />
      </ComponentLayout>
    );
  }
  const NoBlogData = ()=>{
    return(
        <p>No Blog Available</p>
    )
  }

  return <ComponentLayout>{blog.length ? <BlogHome blog={blog} />:<NoBlogData/>}</ComponentLayout>;
};

export default BlogPage;
