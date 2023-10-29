const database = require("../connection/connectionMySQL");

const addComment = (comment, res) => {
  const queryString =
    "INSERT INTO comments (productCode,userCode,content,createDate) VALUES (?, ?, ?, ?)";
  const { productCode, userCode, content, createdDate } = comment;
  const newComment = [productCode, userCode, content, createdDate];
  database.query(queryString, newComment, (err, results) => {
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

const getListComment = (productCode, res) => {
  const queryString =
    "select c.createDate,c.content, u.firstName, u.lastName from comments as c join users as u on c.userCode = u.userCode where productCode = ?";
  database.query(queryString, [productCode], (err, results) => {
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
module.exports = { addComment, getListComment };
