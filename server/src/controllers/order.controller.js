const orderService = require("../services/order.service");

const registerOrder = async (req, res) => {
  const { orderCode, accumulatorCarts, data, createDate, createBy } = req.body;

  const result = await orderService.registerOrder(
    orderCode,
    accumulatorCarts,
    data,
    createDate,
    createBy
  );
  return res.status(result.status).json(result);
};

module.exports = { registerOrder };
