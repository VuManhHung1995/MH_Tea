const express = require("express");
const categoryConntroller = require("../controllers/category.controller");

const categoryRoute = express.Router();

// api get all category
categoryRoute.get("/", categoryConntroller.getAllCategory);

module.exports = categoryRoute;
