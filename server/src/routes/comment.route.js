const express = require("express");
const commentController = require("../controllers/comment.controller");

const commentRoute = express.Router();

// api get all category
commentRoute.post("/", commentController.addComment);
commentRoute.get("/:productCode", commentController.getListComment);

module.exports = commentRoute;
