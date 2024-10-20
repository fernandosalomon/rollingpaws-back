const UserModel = require("../models/user.model");
const {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  updateUserService,
  deleteUserByIdService,
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

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.userID);
    res.status(user.statusCode).json(user.userData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNewUserController = async (req, res) => {
  try {
    const newUser = await createNewUserService(req.body);
    newUser.statusCode === 200
      ? res.status(newUser.statusCode).json(newUser)
      : res.status(newUser.statusCode).json(newUser.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUserController = async (req, res) => {
  try {
    const updatedUser = await updateUserService(req.params.userID, req.body);
    updatedUser.statusCode === 200
      ? res.status(updatedUser.statusCode).json(updatedUser.userData)
      : res.status(updatedUser.statusCode).json(updatedUser.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deleteUserByIdController = async (req, res) => {
  try {
    const deletedUser = await deleteUserByIdService(req.params.userID);
    deletedUser.statusCode === 200
      ? res.status(deletedUser.statusCode).json(deletedUser.userData)
      : res.status(deletedUser.statusCode).json(deletedUser.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllUsersController,
  getUserByIdController,
  createNewUserController,
  updateUserController,
  deleteUserByIdController,
};
