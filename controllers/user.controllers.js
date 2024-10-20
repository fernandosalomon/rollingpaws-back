const UserModel = require("../models/user.model");
const {
  getAllUsersService,
  createNewUserService,
} = require("../services/user.services");

const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsersService();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNewUserController = async (req, res) => {
  try {
    const newUser = await createNewUserService(req.body);
    res.status(newUser.statusCode).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsersController,
  createNewUserController,
};
