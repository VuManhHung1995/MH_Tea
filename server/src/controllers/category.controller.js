const categoryService = require("../services/category.service");

const getAllCategory = (req, res) => {
  return categoryService.getAllCategory(res);
};
module.exports = { getAllCategory };
