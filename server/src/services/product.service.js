const database = require("../connection/connectionMySQL");

const getAllProduct = (nameSearch, limit, offset, res) => {
  //   Khai bao cau query
  let queryString = `SELECT p.*,c.categoryName FROM products as p INNER JOIN categories as c on p.categoryCode = c.categoryCode`;
  // gan them gia tri search
  if (nameSearch) {
    queryString += ` WHERE productName like '%${nameSearch}%' `;
  }
  const countString = queryString;
  queryString += ` LIMIT ${limit} OFFSET ${offset}`;
  // goi vao database
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    } else {
      database.query(countString, (err, resultCount) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err,
          });
        } else {
          return res.status(200).json({
            status: 200,
            data: result,
            count: resultCount.length,
          });
        }
      });
    }
  });
};

const getOneProduct = (id, res) => {
  const queryString = "SELECT * FROM products WHERE productCode = ?";
  database.query(queryString, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result[0],
        userMsg: "get success",
      });
    }
  });
};

const deleteProduct = (id, res) => {
  // Tao cau truy van
  const queryString = "DELETE FROM products WHERE productCode = ?";
  // goi database
  database.query(queryString, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
        userMsg: "System error",
      });
    } else {
      return res.status(200).json({
        status: 200,
        userMsg: "Delete Success",
        data: result,
      });
    }
  });
};

const register = (
  price,
  description,
  category,
  productName,
  srcImage,
  publish,
  createDate,
  createBy,
  modifiedDate,
  modifiedBy,
  productCode,
  res
) => {
  // tao cau query
  const queryString = `INSERT INTO products (price,description,categoryCode,productName,srcImage,publish,createDate,createBy,modifiedDate,modifiedBy,productCode) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
  // goi database
  const newProduct = [
    price,
    description,
    category,
    productName,
    srcImage,
    publish,
    createDate,
    createBy,
    modifiedDate,
    modifiedBy,
    productCode,
  ];
  database.query(queryString, newProduct, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(201).json({
        status: 201,
        userMsg: "Them thanh cong",
      });
    }
  });
};

const editProduct = (newProduct, res) => {
  const queryString = `UPDATE products SET productName = ?, price = ?, categoryCode =?, description = ?, srcImage = ? WHERE productCode = ?;`;
  database.query(queryString, newProduct, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        userMsg: "Update product success",
      });
    }
  });
};

const getAllProductSize = (res) => {
  const queryString = "select * from productSize";
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      res.status(200).json({
        status: 200,
        data: result,
      });
    }
  });
};

const getListProductTopping = (res) => {
  const queryString = "select * from productTopping";
  database.query(queryString, (error, result) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        devMsg: error,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  });
};

const getListProductToppingOfCart = (userCode, res) => {
  const queryString = `select * from productAndToppingOfCard where userCode = ?`;
  database.query(queryString, [userCode], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  });
};
module.exports = {
  getAllProduct,
  getOneProduct,
  deleteProduct,
  register,
  editProduct,
  getAllProductSize,
  getListProductTopping,
  getListProductToppingOfCart,
};
