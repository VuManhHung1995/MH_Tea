const database = require("../connection/connectionMySQL");
const productService = require("../services/product.service");

const getAllProduct = (req, res) => {
  const { nameSearch, page, pageSize } = req.query;
  const limit = Number.parseInt(pageSize) ? Number.parseInt(pageSize) : 10;
  const offset = Number.parseInt(page)
    ? (Number.parseInt(page) - 1) * limit
    : 0;
  return productService.getAllProduct(nameSearch, limit, offset, res);
};

const getOneProduct = (req, res) => {
  const { id } = req.params;
  return productService.getOneProduct(id, res);
};

const deleteProduct = (req, res) => {
  //  lay id tu param
  const { id } = req.params;
  return productService.deleteProduct(id, res);
};

const register = (req, res) => {
  const {
    price,
    description,
    category,
    productName,
    srcImage,
    publish,
    createDate,
    createBy,
    modifiedDate,
    modifiedBy,
    productCode,
  } = req.body;
  return productService.register(
    price,
    description,
    category,
    productName,
    srcImage,
    publish,
    createDate,
    createBy,
    modifiedDate,
    modifiedBy,
    productCode,
    res
  );
};

const editProduct = (req, res) => {
  const { productName, price, category, description, srcImage } = req.body;
  const { id } = req.params;
  const newProduct = [productName, price, category, description, srcImage, id];
  return productService.editProduct(newProduct, res);
};

const getAllProductSize = (req, res) => {
  return productService.getAllProductSize(res);
};

const getListProductTopping = (req, res) => {
  return productService.getListProductTopping(res);
};

const getListProductToppingOfCart = (req, res) => {
  const userCode = req.query.userCode;
  return productService.getListProductToppingOfCart(userCode, res);
};
module.exports = {
  getAllProduct,
  getOneProduct,
  deleteProduct,
  register,
  editProduct,
  getAllProductSize,
  getListProductTopping,
  getListProductToppingOfCart,
};
