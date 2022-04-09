import React from "react";
import BlogEdit from "../../Component/Blog/BlogEdit/BlogEdit";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
const BlogEditPage = () => {
  const { blog, auth } = useSelector((state) => state);
 
  return blog.blog.user_id === auth.user_id ? (
    <ComponentLayout>
      <BlogEdit blog={blog.blog} />
    </ComponentLayout>
  ) : (
    <Navigate to="/" />
  );
};

export default BlogEditPage;
