const mySql2 = require("mysql2/promise");

const pool = mySql2.createPool({
  host: "localhost",
  user: "root",
  password: "vumanhhung290895",
  database: "webbanhang",
  port: 3306,
});

module.exports = pool;
