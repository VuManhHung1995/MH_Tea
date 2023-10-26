const express = require("express");
const productController = require("../controllers/product.controller");

const productRoute = express.Router();

// api get all product
// productRoute.get("/", (req, res) => {
//   const queryString = "SELECT * FROM products";
//   database.query(queryString, (err, results) => {
//     if (err) {
//       return res.status(500).json({
//         status: 500,
//         devMsg: err,
//         userMsg: "Lỗi hệ thống",
//       });
//     } else {
//       return res.status(200).json({
//         status: 200,
//         data: results,
//       });
//     }
//   });
// });

productRoute.get("/", productController.getAllProduct);

// get product by id
productRoute.get("/:id", productController.getOneProduct);

// api delete product
productRoute.delete("/:id", productController.deleteProduct);

// api dang ki product
productRoute.post("/", productController.register);

// edit product
productRoute.patch("/:id", productController.editProduct);

// get list product size
productRoute.get("/get/product-size", productController.getAllProductSize);

// get all product topping
productRoute.get(
  "/get/product-topping",
  productController.getListProductTopping
);

// get topping of cart
productRoute.get(
  "/get/product-topping-of-cart",
  productController.getListProductToppingOfCart
);

module.exports = productRoute;
