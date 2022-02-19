import React from "react";
import { Link } from "@material-ui/core";
import "./NewsComponent.css";
const NewsComponent = ({ data }) => {
  return (
    <div className="shorts-view">
      {data.enclosure.type.includes("image") && (
        <Link
          style={{
            width: "100%",
            padding: "1rem",
            margin: "auto auto ",
            display: "flex",
          }}
          href={data.link}
          target="_blank"
          color="inherit"
          underline="none"
        >
          <img
            className="img-style"
            src={data.enclosure.link}
            alt={data.title}
          />
        </Link>
      )}
      <div className="shorts-inside" style={{ margin: "1rem" }}>
        <p
          style={{
            fontWeight: "bold",
            fontSize: "2rem",
            textAlign: "left",
          }}
        >
          <Link
            sx={{ textDecoration: "none", color: "black" }}
            href={data.link}
            target="_blank"
            color="inherit"
            underline="none"
          >
            {data.title}
          </Link>
        </p>

        <p style={{ textSize: "1rem", textAlign: "justify" }}>
          <Link
            sx={{ textDecoration: "none", color: "black" }}
            href={data.link}
            target="_blank"
            color="inherit"
            underline="none"
          >
            {data.description}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default NewsComponent;
