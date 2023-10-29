const express = require("express");
const orderController = require("../controllers/order.controller");

const orderRoute = express.Router();

orderRoute.post("/", orderController.registerOrder);
orderRoute.get("/", orderController.getAllOrder);
orderRoute.get("/:orderCode", orderController.getOrderDetail);
orderRoute.get(
  "/get-topping/:orderDetailCode",
  orderController.getAllToppingByOrderDetail
);
orderRoute.get("/user/:userCode", orderController.getAllOrderDetailByUser);

module.exports = orderRoute;
