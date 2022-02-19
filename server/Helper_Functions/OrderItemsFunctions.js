const pool = require("../db");
const moment = require("moment");
const createError = require("http-errors");
const created = moment.utc().toISOString();

const createOrderItems = async (data) => {
  try {
    const { orderid, qty, price, id, name, description } = data;
    const orderItems = await pool.query(
      `INSERT INTO orderitems(created,orderid, qty, price, productid, name, description) 
    VALUES($1, $2, $3, $4, $5, $6, $7) returning *`,
      [created, orderid, qty, price, id, name, description]
    );
    if (orderItems?.rows?.length) return orderItems.rows;
  } catch (err) {
    throw createError(500, err);
  }
};

const findOrderItemsById = async (orderId) => {
  try {
    const { userId } = req.session;
    const orderItems = await pool.query(
      `SELECT * from orderitems WHERE orderid= $1 AND userid=$2`,
      [orderId, userId]
    );
    if (orderItems?.rows?.length) return orderItems.rows;
    return [];
  } catch (err) {
    throw createError(500, err);
  }
};

module.exports = { createOrderItems, findOrderItemsById };
