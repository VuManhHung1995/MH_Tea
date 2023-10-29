const pool = require("../connection/connectionMySQL2");
const database = require("../connection/connectionMySQL");
const { v4 } = require("uuid");

const registerOrder = async (
  orderCode,
  userCode,
  accumulatorCarts,
  data,
  totals,
  createDate,
  createBy
) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    //   them thong tin vao bang oder
    let queryStringAddOrder = `INSERT INTO orders (orderCode,userCode,recevierName, phone, adress,totals,quantity, createBy, createDate) VALUES (?,?,?,?,?,?,?,?,?)`;
    let orders = [
      orderCode,
      userCode,
      data.recevierName,
      data.phoneNumber,
      data.adress,
      totals,
      accumulatorCarts.length,
      createBy,
      createDate,
    ];
    await connection.query(queryStringAddOrder, orders);
    // Luu thong tin cac san pham vao bang order detail
    let queryStringAddOrderDetail = `INSERT INTO orderDetail (orderDetailCode,orderCode,productCode, total, productSizeId, totalPrice) VALUES `;
    let orderDetail = [];
    for (let i = 0; i < accumulatorCarts.length; i++) {
      queryStringAddOrderDetail += "(?,?,?,?,?,?),";
      orderDetail.push(
        v4(),
        orderCode,
        accumulatorCarts[i].productCode,
        accumulatorCarts[i].total,
        accumulatorCarts[i].productSizeId,
        accumulatorCarts[i].totalPrice
      );
    }
    queryStringAddOrderDetail = queryStringAddOrderDetail.slice(
      0,
      queryStringAddOrderDetail.length - 1
    );
    await connection.query(queryStringAddOrderDetail, orderDetail);
    // Luu thong tin topping vao bang topping cua order
    const queryStringGetAllOrder =
      "select orderDetailCode, productCode from orderDetail  where orderCode = ?";
    const [result] = await connection.query(queryStringGetAllOrder, orderCode);
    for (let i = 0; i < accumulatorCarts.length; i++) {
      const [listToppingByCart] = await connection.query(
        "select * from productAndToppingOfCard where cartCode = ?",
        accumulatorCarts[i].cartCode
      );
      if (listToppingByCart.length > 0) {
        const findOrderDetailCode = result.find(
          (item) => item.productCode === accumulatorCarts[i].productCode
        );
        listToppingByCart.forEach(async (item) => {
          await connection.query(
            "INSERT INTO productAndToppingOfOrder (orderDetailCode, productToppingId) VALUES (?,?)",
            [findOrderDetailCode.orderDetailCode, item.productToppingId]
          );
        });
      }
    }
    // Xoa thong tin cac san pham da order trong bang cart va cac topping trong bangtopping cua cart
    console.log(accumulatorCarts, "acc");
    const queryStringDeleteCart = "delete from carts where cartCode = ?";
    const queryStringDeleteToppingOfCart = `delete from productAndToppingOfCard where cartCode = ?`;
    accumulatorCarts.forEach(async (item) => {
      await connection.query(queryStringDeleteCart, item.cartCode);
      await connection.query(queryStringDeleteToppingOfCart, item.cartCode);
    });
    await connection.commit();
    await connection.release();
    return {
      status: 201,
      userMsg: "add to order success",
    };
  } catch (error) {
    if (connection) {
      await connection.rollback();
      await connection.release();
      return {
        status: 500,
        devMsg: "add to order faild",
      };
    }
  }
};

const getAllOrder = (nameSearch, limit, offset, res) => {
  //   Khai bao cau query
  let queryString = `SELECT * from orders`;
  // gan them gia tri search
  if (nameSearch) {
    queryString += ` WHERE recevierName like '%${nameSearch}%' or phone like '%${nameSearch}%'`;
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

const getOrderDetail = (orderCode, res) => {
  let queryString = `select * from orderDetail as od
                    join products as p
                    on od.productCode = p.productCode
                    join productSize as pz
                    on pz.productSizeId =  od.productSizeId
                    where orderCode = ?`;
  database.query(queryString, [orderCode], (error, result) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  });
};

const getAllToppingByOrderDetail = (orderDetailCode, res) => {
  let queryString = `select * from productAndToppingOfOrder as patoo join productTopping as pt
                    on patoo.productToppingId = pt.productToppingId
                    where orderDetailCode = ?`;
  database.query(queryString, [orderDetailCode], (error, result) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result,
      });
    }
  });
};
const getAllOrderDetailByUser = (userCode, res) => {
  let queryString = `select * from orders as o
                    join orderDetail as od
                    on o.orderCode = od.orderCode
                    join products as p
                    on od.productCode = p.productCode
                    join productSize as pz
                    on pz.productSizeId =  od.productSizeId
                    where userCode = ?`;
  database.query(queryString, [userCode], (error, result) => {
    if (error) {
      return res.status(500).json({
        status: 500,
        error: error,
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
  registerOrder,
  getAllOrder,
  getOrderDetail,
  getAllToppingByOrderDetail,
  getAllOrderDetailByUser,
};
