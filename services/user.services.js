const UserModel = require("../models/user.model");

const getAllUsersService = async () => {
  const users = await UserModel.find();
  return users;
};

module.exports = {
  getAllUsersService,
};
