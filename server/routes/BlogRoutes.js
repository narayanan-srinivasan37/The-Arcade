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
    const { description, content, title, user_id } = await req.body;
    const blog = await createABlog(user_id, title, description, content);
    res.status(201).send(blog);
  } catch (err) {
    next(err);
  }
});

blogRoutes.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const editBlog = await findBlogById(id);
    res.status(200).send(editBlog);
  } catch (err) {
    next(err);
  }
});
blogRoutes.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const { user_id, content, title, description } =  req.body.data;
    const editBlog = await editABlog(content, title, description, id, user_id);
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
