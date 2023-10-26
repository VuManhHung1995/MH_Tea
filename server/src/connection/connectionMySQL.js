const mySql = require("mysql2");

require("dotenv").config();

const connect = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "vumanhhung290895",
  database: "webbanhang",
  port: 3306,
});

connect.connect((error) => {
  if (error) {
    console.log("conect fail", error);
  } else {
    console.log("connect success");
  }
});

module.exports = connect;
