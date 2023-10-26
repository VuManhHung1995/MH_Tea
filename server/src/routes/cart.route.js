const express = require("express");
const database = require("../connection/connectionMySQL");
const cartController = require("../controllers/cart.controller");

const cartRoute = express.Router();

// api lay du lieu trong cart
cartRoute.get("/", cartController.getAllCart);

// api lay danh sach cart theo user
cartRoute.get("/:id_user", cartController.getCartByUser);

// api dang ki product vao cart
cartRoute.post("/", cartController.register);

// api xoa topping cua san pham trong cart
cartRoute.delete("/delete/topping", cartController.deleteTopping);

// api xoa cart trong bang carts
cartRoute.delete(`/:cartCode`, cartController.deleteOneCart);

// cap nhat thong tin so luong san pham trong cart
cartRoute.patch(`/:cartCode`, cartController.updateCart);

module.exports = cartRoute;
