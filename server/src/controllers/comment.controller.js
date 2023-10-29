const commentService = require("../services/comment.service");

const addComment = (req, res) => {
  const comment = req.body;
  return commentService.addComment(comment, res);
};

const getListComment = (req, res) => {
  const productCode = req.params.productCode;
  return commentService.getListComment(productCode, res);
};

module.exports = { addComment, getListComment };
