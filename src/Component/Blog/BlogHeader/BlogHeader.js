import { border } from "@mui/system";
import React from "react";
import "./BlogHeader.css";
const BlogHeader = () => {
  return (
    <figure style={{ postion: "relative", margin:0, background: "rgba(0,0,0,1)" }}>
      <picture className="blog-header">
        <img
          className="image-size"
          src="https://i.ytimg.com/vi/7YrkvUW84RM/maxresdefault.jpg"
          alt="review"
        />
      </picture>
      <figcaption className="headReview-title">
        Review | Spider-Man PS4
      </figcaption>
    </figure>
  );
};

export default BlogHeader;
