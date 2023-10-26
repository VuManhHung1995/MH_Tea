const express = require("express");
const orderController = require("../controllers/order.controller");

const orderRoute = express.Router();

orderRoute.post("/", orderController.registerOrder);

module.exports = orderRoute;
