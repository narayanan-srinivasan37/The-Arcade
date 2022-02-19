import API from "./client";

export const postABlog = async ({ user_id, description, content, title }) => {
  try {
    const response = await API.post("/blog", {
      user_id,
      description,
      content,
      title,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getAllBlog = async () => {
  try {
    const response = await API.get("/blog");

    return response.data;
  } catch (err) {
    throw err;
  }
};

export const getBlogById = async (id) => {
  try {
    const response = await API.get(`/blog/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};
export const editABlog = async (data) => {
  try {
    const response = await API.put(`/blog/${data.id}`, {
      data,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
};
