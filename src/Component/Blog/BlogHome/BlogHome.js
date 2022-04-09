import React from "react";
import BlogHeader from "../BlogHeader/BlogHeader";
import Bloglist from "../Bloglist/BlogList";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { useNavigate } from "react-router-dom";
const BlogHome = ({ blog }) => {
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate()

  return (
    <div>
      {auth.isAuthenticated && auth.user.roles === "admin" && (
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "1rem 0.2rem",
          }}
          onClick={()=>navigate("/blog/create")}
        >
          <Button variant="outlined" startIcon={<AssignmentIcon />}>
            Create Blog
          </Button>
        </div>
      )}
      <Bloglist blog={blog} />
    </div>
  );
};

export default BlogHome;
