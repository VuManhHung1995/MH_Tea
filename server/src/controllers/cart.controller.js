const database = require("../connection/connectionMySQL");
const cartService = require("../services/cart.service");

const getAllCart = (req, res) => {
  return cartService.getAllCart(res);
};

const register = (req, res) => {
  const {
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
  } = req.body;

  return cartService.register(
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
  );
};

const getCartByUser = (req, res) => {
  const { id_user } = req.params;
  return cartService.getCartByUser(id_user, res);
};

const deleteTopping = (req, res) => {
  const { productToppingId, cartCode } = req.query;
  return cartService.deleteTopping(productToppingId, cartCode, res);
};

const deleteOneCart = (req, res) => {
  const cartCode = req.params.cartCode;
  return cartService.deleteOneCart(cartCode, res);
};

const updateCart = (req, res) => {
  const cartCode = req.params.cartCode;
  const { quantity, totalPrice } = req.query;
  return cartService.updateCart(cartCode, quantity, totalPrice, res);
};
module.exports = {
  getAllCart,
  register,
  getCartByUser,
  deleteTopping,
  deleteOneCart,
  updateCart,
};
