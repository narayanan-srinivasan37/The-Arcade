import { textAlign } from "@mui/system";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./BlogList.css";
const Bloglist = ({ blog }) => {
  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -100px 0px",
  };
  const appearOnScroll = new IntersectionObserver(function (
    entries,
    appearOnScroll
  ) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    });
  },
  appearOptions);
  useEffect(() => {
    const sliders = document.querySelectorAll(".slide-in");
    sliders.forEach((slider) => {
      appearOnScroll.observe(slider);
    });
  }, [appearOnScroll]);
  return (
    <div className="blog-head">
      {blog.length &&
        blog.map((data, index) => {
          if (index % 2 == 0) {
            return (
              <div className="poster-grid" key={data.id}>
                <Link
                  to={{ pathname: `/blog/${data.id}` }}
                  state={data}
                  className="slide-in from-left"
                >
                  <img
                    style={{ maxWidth: "100%" }}
                    src={data.display_image}
                    alt="image"
                  />
                </Link>
                <Link
                  className="slide-in link-style from-right"
                  to={{ pathname: `/blog/${data.id}` }}
                  state={data}
                >
                  <p className="blog-title">{data.title}</p>
                  <p className="blog-description">{data.description}</p>
                </Link>
              </div>
            );
          } else {
            return (
              <div key={data.id} className="poster-grid">
                <Link
                  className="slide-in link-style from-left"
                  to={{ pathname: `/blog/${data.id}` }}
                >
                  <p>{data.title}</p>
                  <p>{data.description}</p>
                </Link>
                <Link
                  className="slide-in from-right"
                  to={{ pathname: `/blog/${data.id}` }}
                >
                  <img
                    style={{ maxWidth: "100%" }}
                    src={data.display_image}
                    alt="image"
                  />
                </Link>
              </div>
            );
          }
        })}
      <div className="blog-head-flex">
        {blog.length &&
          blog.map((data, index) => {
            return (
              <div key={index}>
                <Link
                  className="poster-flex"
                  to={{ pathname: `/blog/${data.id}` }}
                >
                  <img
                    style={{ maxWidth: "100%" }}
                    src={data.display_image}
                    alt="image"
                  />
                </Link>
                <Link
                  className="link-style"
                  to={{ pathname: `/blog/${data.id}` }}
                >
                  <p className="blog-title">{data.title}</p>
                  <p className="blog-description">{data.description}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Bloglist;
