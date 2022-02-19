const pool = require("../db");
const createError = require("http-errors");

const getAllProducts = async () => {
  try {
    const products = await pool.query("SELECT * FROM products");

    if (products.rows?.length) {
      return products.rows;
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

const getProductsByName = async (name) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products where name = $1",
      [name]
    );
    if (products.rows?.length) {
      return products.rows[0];
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};
const updateProducts = async ({
  id,
  name,
  description,
  image_url,
  quantity,
}) => {
  try {
    const products = await pool.query(
      "UPDATE products set name = $1, price = $2, description = $3 image_url = $4 quantity = $5 where id = $6 returning *",
      [name, price, description, image_url, quantity, id]
    );

    if (products.rows?.length) {
      return products.rows[0];
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

const getProductById = async (id) => {
  try {
    const products = await pool.query(
      "SELECT * FROM products where id = $1",
      [id]
    );
    
    if (products.rows?.length) {
      return products.rows[0];
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

const deleteProducts = async (id) => {
  try {
    const product = await pool.query(
      "DELETE FROM products where product_id = $1 returning *",
      [id]
    );
    return product.rows[0];
  } catch (err) {
    throw createError(500, err);
  }
};
module.exports = {
  getAllProducts,
  updateProducts,
  getProductsByName,
  deleteProducts,
  getProductById,
};
