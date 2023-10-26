const pool = require("../connection/connectionMySQL2");
const { v4 } = require("uuid");
const registerOrder = async (
  orderCode,
  accumulatorCarts,
  data,
  createDate,
  createBy
) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    //   them thong tin vao bang oder
    let queryStringAddOrder = `INSERT INTO orders (orderCode,recevierName, phone, adress, createBy, createDate) VALUES (?,?,?,?,?,?)`;
    let orders = [
      orderCode,
      data.recevierName,
      data.phoneNumber,
      data.adress,
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

module.exports = { registerOrder };
