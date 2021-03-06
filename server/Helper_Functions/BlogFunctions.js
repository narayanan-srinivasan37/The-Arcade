const pool = require("../db");
const createError = require("http-errors");

const findBlogById = async (id) => {
  try {
    const blog = await pool.query("SELECT * from blog where id=$1", [id]);
    if (blog.rows?.length) {
      return blog.rows[0];
    }
    return null;
  } catch (err) {
    throw createError(500, err);
  }
};
const findAllBlogs = async () => {
  try {
   
    const allBlogs = await pool.query("SELECT * from blog");
    if (allBlogs.rows?.length) {
      return allBlogs.rows;
    }
    return [];
  } catch (err) {
   
    throw createError(500, err);
  }
};
const createABlog = async (title, description, content, userId, displayImage) => {
  try {
    console.log(displayImage)
    const newBlog = await pool.query(
      "INSERT into blog(title, user_id, blog_content, description, display_image) VALUES($1, $2, $3, $4, $5)",
      [title, userId, content, description, displayImage]
    );
    console.log(newBlog)
    return newBlog;
  } catch (err) {
    throw new createError(500, err);
  }
};

const editABlog = async (content, title, description, id, userId) => {
  try {
    const editBlog = await pool.query(
      "UPDATE blog set blog_content=$1, description = $2, title=$3 where id=$4 and user_id=$5",
      [content, description, title, id, userId]
    );
   
    if (editBlog.rowCount !== 0) {
      const blog = await findBlogById(id);
    
      return blog;
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

const deleteABlog = async (id, user_id) => {
  try {
    const deleteBlog = await pool.query(
      "DELETE from blog where id=$1 and user_id=$2",
      [id, user_id]
    );
    if (deleteBlog) {
      return deleteBlog.rows[0];
    }
    return null;
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = {
  findBlogById,
  findAllBlogs,
  createABlog,
  editABlog,
  deleteABlog,
};
