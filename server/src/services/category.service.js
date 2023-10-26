const database = require("../connection/connectionMySQL");

const getAllCategory = (res) => {
  const queryString = "SELECT * FROM categories";
  database.query(queryString, (err, results) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
        userMsg: "Lỗi hệ thống",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: results,
      });
    }
  });
};

module.exports = { getAllCategory };
