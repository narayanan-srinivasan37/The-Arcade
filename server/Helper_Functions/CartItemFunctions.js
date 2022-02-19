const pool = require("../db");
const createError = require("http-errors");
const { findOneByUserId } = require("./CartFunctions");
const getCartItems = async (userId) => {
  try {
    const cart = await findOneByUserId(userId);

    const { id } = cart;
    const result = await pool.query(
      `SELECT ci.qty,ci.cartid AS cartItemId, ci.id AS cartId,products.* , 
      round(products.price * ci.qty, 2) AS subtotal
      FROM cartitems as ci
 INNER JOIN products products ON products.id = ci.productid
 WHERE "cartid" = $1`,
      [id]
    );

    if (result.rows?.length) {
      return result.rows;
    }

    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

const addCartItems = async (cart_id, product_id, quantity) => {
  try {
    const cart = await pool.query(
      `INSERT INTO cartitems(cartid, productid, qty) VALUES($1, $2, $3) 
                ON CONFLICT(cartid, productid)
                DO UPDATE set qty = cartitems.qty+1 `,
      [cart_id, product_id, quantity]
    );

    const cartItems = await pool.query(
      `SELECT ci.qty,ci.cartid AS cartitemId,ci.id AS cartId,  products.*, round(products.price * ci.qty, 2) AS subtotal FROM cartitems as ci
            INNER JOIN products products ON products.id = ci.productid
            WHERE "cartid" = $1`,
      [cart_id]
    );

    if (cartItems.rows?.length) {
      return cartItems.rows;
    }
    return [];
  } catch (err) {
    console.log(err);
    throw createError(500, err);
  }
};

const deleteCartItem = async (cart_id, product_id) => {
  try {
    console.log(cart_id, product_id);
    const deleteItems = await pool.query(
      "DELETE from cartitems WHERE cartid = $1 AND productid = $2 returning *",
      [cart_id, product_id]
    );
    console.log(deleteItems);
    const cartItems = await pool.query(
      `SELECT ci.qty,ci.cartid AS cartitemId, ci.id AS cartId,  products.*, 
      round(products.price * ci.qty, 2) AS subtotal FROM cartitems as ci
            INNER JOIN products products ON products.id = ci.productid
            WHERE cartid = $1`,
      [cart_id]
    );
    return cartItems.rows;
  } catch (err) {
    cart_id.log(err);
    throw createError(500, err);
  }
};

const updateCartItem = async (cart_id, product_id, quantity) => {
  try {
    const cartUpdate = await pool.query(
      `UPDATE cartitems set qty = $1 where cartitems.cartid = $2 and productid = $3 returning  *`,
      [quantity, cart_id, product_id]
    );

    const cartItems = await pool.query(
      `SELECT ci.qty,ci.cartid AS cartitemId,ci.id AS cartId,  products.*, 
      round(products.price * ci.qty, 2) AS subtotal FROM cartitems as ci
            INNER JOIN products products ON products.id = ci.productid
            WHERE cartid = $1`,
      [cart_id]
    );
    if (cartItems.rows?.length) {
      return cartItems.rows;
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = { getCartItems, addCartItems, deleteCartItem, updateCartItem };
