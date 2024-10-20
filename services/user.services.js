const UserModel = require("../models/user.model");

const getAllUsersService = async () => {
  const users = await UserModel.find();
  return users;
};

const createNewUserService = async (body) => {
  const { name } = body;
  const newUser = new UserModel({ name });
  const registerUser = await newUser.save();
  return {
    registerUser,
    statusCode: 201,
  };
};

module.exports = {
  getAllUsersService,
  createNewUserService,
};
