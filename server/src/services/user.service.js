const database = require("../connection/connectionMySQL");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUser = (nameSearch, limit, offset, res) => {
  //   Khai bao cau query
  let queryString = `SELECT * FROM users`;
  // gan them gia tri search
  if (nameSearch) {
    queryString += ` WHERE firstName like '%${nameSearch}%' OR lastName like '%${nameSearch}%'`;
  }
  const countString = queryString;
  queryString += ` LIMIT ${limit} OFFSET ${offset}`;
  // goi vao database
  database.query(queryString, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        error: err,
      });
    } else {
      database.query(countString, (err, resultCount) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            error: err,
          });
        } else {
          return res.status(200).json({
            status: 200,
            data: result,
            count: resultCount.length,
          });
        }
      });
    }
  });
};

const getOneUser = (id, res) => {
  const queryString = "SELECT * FROM users WHERE UserCode = ?";
  database.query(queryString, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        data: result[0],
        userMsg: "get success",
      });
    }
  });
};

const deleteUser = (id, res) => {
  // Tao cau truy van
  const queryString = "DELETE FROM users WHERE UserCode = ?";
  // goi database
  database.query(queryString, [id], (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
        userMsg: "System error",
      });
    } else {
      return res.status(200).json({
        status: 200,
        userMsg: "Delete Success",
        data: result,
      });
    }
  });
};

const editUser = (newUser, res) => {
  const queryString = `UPDATE users SET firstName = ?, lastName = ?, role =? WHERE userCode = ?;`;
  database.query(queryString, newUser, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
      });
    } else {
      return res.status(200).json({
        status: 200,
        userMsg: "Update success",
      });
    }
  });
};

const register = (
  firstName,
  lastName,
  email,
  password,
  createDate,
  createBy,
  modifiedDate,
  modifiedBy,
  role,
  userCode,
  status,
  res
) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        status: 500,
        devMsg: err,
        message: "loi hash",
      });
    } else {
      // tao cau query
      const queryString = `INSERT INTO users (firstName,lastName,email,password,createDate,createBy,modifiedDate,modifiedBy,role,userCode,status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;
      // goi database
      const newUser = [
        firstName,
        lastName,
        email,
        hash,
        createDate,
        createBy,
        modifiedDate,
        modifiedBy,
        role,
        userCode,
        status,
      ];
      database.query(queryString, newUser, (err, result) => {
        if (err) {
          return res.status(500).json({
            status: 500,
            devMsg: err,
          });
        } else {
          return res.status(201).json({
            status: 201,
            userMsg: "Them thanh cong",
          });
        }
      });
    }
  });
};

const login = (email, password, res) => {
  // kiem tra email co ton tai trong database khong?
  const queryString = "SELECT * FROM users WHERE email = ?";
  // goi database
  database.query(queryString, email, (err, result) => {
    if (err) {
      res.status(500).json({
        status: 500,
        devMSg: err,
      });
    } else {
      if (result.length < 1) {
        return res.status(401).json({
          status: 401,
          userMsg: "Email chua duoc dang ki",
        });
      } else {
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
          if (err) {
            return res.status(500).json({
              status: 500,
              devMsg: err,
            });
          } else {
            if (isMatch) {
              // tao chuoi token bang jwt
              const token = jwt.sign(
                { userId: result[0].userCode },
                "userId_key",
                {
                  expiresIn: "1h",
                }
              );
              // set chuoi token len cookie
              res.cookie("cookie_token", token, {
                maxAge: 36000000000,
                httpOnly: true,
              });
              // Du lieu tra ve client
              return res.status(200).json({
                status: 200,
                userMsg: "Dang nhap thanh cong",
                data: result[0],
                token: token,
              });
            } else {
              return res.status(401).json({
                status: 401,
                userMsg: "Mat khau nhap vao sai",
              });
            }
          }
        });
      }
    }
  });
};
module.exports = {
  getAllUser,
  getOneUser,
  deleteUser,
  editUser,
  register,
  login,
};
