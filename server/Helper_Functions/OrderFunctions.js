const pool = require("../db");
const moment = require("moment");
const createError = require("http-errors");
const created = moment.utc().toISOString();
const modified = moment.utc().toISOString();

const createOrder = async (data) => {
  try {
    const currentStatus = data.status || "Pending";

    const order = await pool.query(
      `INSERT INTO orders(total,status,userid,created,modified) 
    VALUES($1, $2, $3, $4, $5) returning *`,
      [data.total, currentStatus, data.userid, created, modified]
    );
    if (order?.rows?.length) return order.rows;
  } catch (err) {
    throw createError(500, err);
  }
};

const findOrderByUserId = async (userId) => {
  try {
    const order = await pool.query("SELECT * from orders WHERE userid=$1", [
      userId,
    ]);
    if (order?.rows?.length) return order.rows;
  } catch (err) {
    throw createError(500, err);
  }
};

const updateStatus = async (data) => {
  try {
    const order = await pool.query(
      "UPDATE orders SET status=$1 WHERE userid=$2 returning *",
      [data.status, data.userid]
    );
  } catch (err) {
    throw createError(500, err);
  }
};
module.exports = { createOrder, findOrderByUserId, updateStatus };
