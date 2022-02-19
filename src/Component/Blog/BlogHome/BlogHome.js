import React from "react";
import BlogHeader from "../BlogHeader/BlogHeader";
import Bloglist from "../Bloglist/BlogList";
const BlogHome = ({ blog }) => {
  return (
    <div>
      <BlogHeader blog={blog} />
      <Bloglist blog={blog} />
    </div>
  );
};

export default BlogHome;
