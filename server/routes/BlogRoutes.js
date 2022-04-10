const express = require("express");
const blogRoutes = express.Router();
const {
  findBlogById,
  findAllBlogs,
  editABlog,
  deleteABlog,
  createABlog,
} = require("../Helper_Functions/BlogFunctions");
blogRoutes.get("/", async (req, res, next) => {
  try {
    
    const blogs = await findAllBlogs();
    res.status(200).send(blogs);
  } catch (err) {
    next(err);
  }
});

blogRoutes.post("/", async (req, res, next) => {
  try {
    const { description, content, title, displayImage} = await req.body;
    const {userId} = req.session
    const blog = await createABlog( title, description, content, userId, displayImage);
    res.status(201).send(blog);
  } catch (err) {
    next(err);
  }
});

blogRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const getblog = await findBlogById(id);
    res.status(200).send(getblog);
  } catch (err) {
    next(err);
  }
});
blogRoutes.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const {userId} = req.session
    const {content, title, description, displayImage } =  req.body.data;
    const editBlog = await editABlog(content, title, description, id, userId, displayImage);
    res.status(200).send(editBlog);
  } catch (err) {
    next(err);
  }
});

blogRoutes.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = await req.body;
    const deleteBlog = await deleteABlog(id, user_id);
    res.status(204).send("Deleted");
  } catch (err) {
    next(err);
  }
});

module.exports = blogRoutes;
