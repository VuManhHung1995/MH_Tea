const userService = require("../services/user.service");

const getAllUser = (req, res) => {
  const { nameSearch, page, pageSize } = req.query;
  const limit = Number.parseInt(pageSize) ? Number.parseInt(pageSize) : 10;
  const offset = Number.parseInt(page)
    ? (Number.parseInt(page) - 1) * limit
    : 0;
  return userService.getAllUser(nameSearch, limit, offset, res);
};

const getOneUser = (req, res) => {
  const { id } = req.params;
  return userService.getOneUser(id, res);
};

const deleteUser = (req, res) => {
  //  lay id tu param
  const { id } = req.params;
  return userService.deleteUser(id, res);
};

const editUser = (req, res) => {
  const { firstName, lastName, role } = req.body;
  const { id } = req.params;
  const newUser = [firstName, lastName, role, id];
  return userService.editUser(newUser, res);
};

const register = (req, res) => {
  const {
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
  } = req.body;
  return userService.register(
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
  );
};

const login = (req, res) => {
  const { email, password } = req.body;
  return userService.login(email, password, res);
};
module.exports = {
  getAllUser,
  getOneUser,
  deleteUser,
  editUser,
  register,
  login,
};
