const orderService = require("../services/order.service");

const registerOrder = async (req, res) => {
  const {
    orderCode,
    userCode,
    accumulatorCarts,
    data,
    totals,
    createDate,
    createBy,
  } = req.body;

  const result = await orderService.registerOrder(
    orderCode,
    userCode,
    accumulatorCarts,
    data,
    totals,
    createDate,
    createBy
  );
  return res.status(result.status).json(result);
};

const getAllOrder = (req, res) => {
  const { nameSearch, page, pageSize } = req.query;
  const limit = Number.parseInt(pageSize) ? Number.parseInt(pageSize) : 10;
  const offset = Number.parseInt(page)
    ? (Number.parseInt(page) - 1) * limit
    : 0;
  return orderService.getAllOrder(nameSearch, limit, offset, res);
};

const getOrderDetail = (req, res) => {
  const { orderCode } = req.params;
  return orderService.getOrderDetail(orderCode, res);
};

const getAllToppingByOrderDetail = (req, res) => {
  const { orderDetailCode } = req.params;
  return orderService.getAllToppingByOrderDetail(orderDetailCode, res);
};

const getAllOrderDetailByUser = (req, res) => {
  const { userCode } = req.params;
  return orderService.getAllOrderDetailByUser(userCode, res);
};
module.exports = {
  registerOrder,
  getAllOrder,
  getOrderDetail,
  getAllToppingByOrderDetail,
  getAllOrderDetailByUser,
};
