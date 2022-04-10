const pool = require("../db");
const moment = require("moment");
const createError = require("http-errors");
const created = moment.utc().toISOString();

const createOrderItems = async (data) => {
  try {
    const { orderId, qty, price, id, name, description, userId } = data;
    const orderItems = await pool.query(
      `INSERT INTO orderitems(created,orderid, qty, price, productid, name, description, userid) 
    VALUES($1, $2, $3, $4, $5, $6, $7, $8) returning *`,
      [created, orderId, qty, price, id, name, description, userId]
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
const findOrderItemsByUserId = async (userId) => {
  try {
    const order = await pool.query(`SELECT u.created, u.id, u.total, json_agg(json_build_object('name',p.name,
    'price', p.price,'quantity', o.qty,'description', 
    p.description, 'image_url', p.image_url)) as orderItems from orders u
    join orderitems o on u.id = o.orderid join products p on o.productid = p.id 
    where o.userid = $1 group by u.id`, [
      userId,
    ]);
    if (order?.rows?.length) return order.rows;
  } catch (err) {
    throw createError(500, err);
  }
};


module.exports = { createOrderItems, findOrderItemsById, findOrderItemsByUserId };
