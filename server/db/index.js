const { Pool } = require("pg");
const { DB } = require("../config");
const pool = new Pool({
  PGHOST: DB.PGHOST,
  PGUSER: DB.PGUSER,
  PGDATABASE: DB.PGDATABASE,
  PGPASSWORD: DB.PGPASSWORD,
  PGPORT: DB.PGPORT,
});

module.exports = pool;
