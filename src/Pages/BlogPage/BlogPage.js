import React, { useEffect } from "react";
import BlogHome from "../../Component/Blog/BlogHome/BlogHome";
import { Button } from "@mui/material";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ComponentLayout from "../../Component/ComponentLayout/ComponentLayout";
import { useDispatch, useSelector } from "react-redux";
import { allBlogs } from "../../ReduxStore/Reducers/BlogReducer";
import { useNavigate } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
const BlogPage = () => {
  const dispatch = useDispatch();
  const { blog, isLoading, error } = useSelector((state) => state.blog);
  const { auth } = useSelector((state) => state);
  const navigate = useNavigate()
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

  const createBlog = ()=>{
    return auth.isAuthenticated && auth.user.roles === "admin" && (
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
    )
  }
  const NoBlogData = ()=>{
    return(
      <div className="empty-cart">
        {createBlog()}
      <h1>No Blog Available</h1>
      </div>
    )
  }

  return <ComponentLayout>{blog.length ? <BlogHome blog={blog} />:<NoBlogData/>}</ComponentLayout>;
};

export default BlogPage;
