const express = require("express");
const database = require("../connection/connectionMySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");

const userRoute = express.Router();
userRoute.get("/", userController.getAllUser);

// api get user by id
userRoute.get("/:id", userController.getOneUser);

// api delete user
userRoute.delete("/:id", userController.deleteUser);

// api edit user
userRoute.patch("/:id", userController.editUser);

// api dang ki user
userRoute.post("/register", userController.register);

// api dang nhap
userRoute.post("/login", userController.login);

// api xac thuc dang nhap
userRoute.get("/get/check-login", (req, res) => {
  const token = req.cookies.cookie_token;
  jwt.verify(token, "userId_key", (error, decode) => {
    if (error) {
      return res.status(401).json({
        status: 401,
        msg: "token da het han",
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: decode.userId,
      });
    }
  });
});

// api clear cookie when logout
userRoute.get("/get/cancel-cookie", (req, res) => {
  res.clearCookie("cookie_token");
  res.end();
});

module.exports = userRoute;
