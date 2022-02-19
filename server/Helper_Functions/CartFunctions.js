const pool = require("../db");
const moment = require('moment');
const createError = require("http-errors");
const created = moment.utc().toISOString();
const modified = moment.utc().toISOString();
const createCart = async (userId) => {
  try {
    
    const cart = await pool.query(
      `INSERT INTO carts(userid, created, modified) 
      values($1,$2, $3 ) returning *`,
      [userId, created, modified]
    );
    console.log(cart)
    if (cart.rows?.length) {
      return cart.rows[0];
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

const findOneByUserId = async (userId) => {
  try {
    const cart = await pool.query("SELECT * from carts where userid = $1", [
      userId,
    ]);
    if (cart.rows?.length) {
      return cart.rows[0];
    }
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};



module.exports = { createCart, findOneByUserId };
