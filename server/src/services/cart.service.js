const database = require("../connection/connectionMySQL");

// const getAllCart = async (res) => {
//   queryString = `select * from carts`;
//   // goi vao database
//   database.query(queryString, (err, result) => {
//     if (err) {
//       return res.status(500).json({
//         status: 500,
//         error: err,
//       });
//     } else {
//       return res.status(200).json({
//         status: 200,
//         data: result,
//       });
//     }
//   });
// };

const register = (
  cartCode,
  userCode,
  productCode,
  total,
  productSizeId,
  createDate,
  createBy,
  modifiedDate,
  modifiedBy,
  listTopping,
  totalPrice,
  res
) => {
  // tao cau query
  const queryString = `INSERT INTO carts (cartCode,userCode,productCode,total,productSizeId,totalPrice,createDate,createBy,modifiedDate,modifiedBy) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?);`;
  let queryString2 = `INSERT INTO productAndToppingOfCard (cartCode,productToppingId, userCode) VALUES `;

  // goi database
  const newCart = [
    cartCode,
    userCode,
    productCode,
    total,
    productSizeId,
    totalPrice,
    createDate,
    createBy,
    modifiedDate,
    modifiedBy,
  ];
  database.beginTransaction();
  database.query(queryString, newCart, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      if (listTopping.length > 0) {
        let newTopping = [];
        for (let index = 0; index < listTopping.length; index++) {
          queryString2 += "(?,?, ?),";
          newTopping.push(
            cartCode,
            listTopping[index].productToppingId,
            userCode
          );
        }
        queryString2 = queryString2.slice(0, queryString2.length - 1);
        database.query(queryString2, newTopping, (err, result) => {
          if (err) {
            database.rollback();
            return res.status(500).json({
              status: 500,
              devMsg: err,
            });
          } else {
            database.commit();
            return res.status(201).json({
              status: 201,
              userMsg: "Them thanh cong",
            });
          }
        });
      } else {
        database.commit();
        return res.status(201).json({
          status: 201,
          userMsg: "Them thanh cong",
        });
      }
    }
  });
};

const getCartByUser = (id_user, res) => {
  const queryString = ` select * from carts as c inner join products as p
                        on c.productCode = p.productCode
                        inner join productSize as ps
                        on ps.productSizeId = c.productSizeId
                        where userCode = ?`;
  database.query(queryString, id_user, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(201).json({
        status: 201,
        data: result,
      });
    }
  });
};
const deleteTopping = (productToppingId, cartCode, res) => {
  const queryString =
    "delete from productAndToppingOfCard where cartCode = ? and productToppingId = ?";
  database.query(queryString, [cartCode, productToppingId], (error, result) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(200).json({
        status: 201,
        data: result,
      });
    }
  });
};
const deleteOneCart = (cartCode, res) => {
  const queryString = "delete from carts where cartCode = ?";
  const queryString2 = `delete from productAndToppingOfCard where cartCode = ?`;
  database.beginTransaction();
  database.query(queryString, [cartCode], (error, result) => {
    if (error) {
      database.rollback();
      return res.status(500).json({
        status: 500,
        devMsg: error,
      });
    } else {
      database.query(queryString2, [cartCode], (error, result) => {
        if (error) {
          database.rollback();
          return res.status(500).json({
            status: 500,
            devMsg: err,
          });
        } else {
          database.commit();
          return res.status(200).json({
            status: 200,
            userMsg: "Delete cart success",
          });
        }
      });
    }
  });
};
const updateCart = (cartCode, quantity, totalPrice, res) => {
  let queryString;
  let params;
  if (quantity) {
    queryString = `update carts SET total = ? where cartCode = ?`;
    params = [quantity, cartCode];
  }
  if (totalPrice) {
    queryString = `update carts SET totalPrice = ? where cartCode = ?`;
    params = [totalPrice, cartCode];
  }
  database.query(queryString, params, (err, result) => {
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
  register,
  getCartByUser,
  deleteTopping,
  deleteOneCart,
  updateCart,
};
