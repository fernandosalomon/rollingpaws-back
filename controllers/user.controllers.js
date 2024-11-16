const UserModel = require("../models/user.model");
const {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  updateUserService,
  deleteUserByIdService,
} = require("../services/user.services");
const jwt = require("jsonwebtoken");

const getAllUsersController = async (req, res) => {
  const token = req.headers.authtoken;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;
  try {
    const users = await getAllUsersService(userID);
    users.statusCode === 200
      ? res.status(users.statusCode).json(users.data)
      : res.status(users.statusCode).json(users.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getUserByIdController = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.userID);
    user.statusCode === 200
      ? res.status(user.statusCode).json(user.data)
      : res.status(user.statusCode).json(user.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNewUserController = async (req, res) => {
  try {
    const newUser = await createNewUserService(req.body);
    newUser.statusCode === 201
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
      ? res.status(updatedUser.statusCode).json(updatedUser.data)
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
      ? res.status(deletedUser.statusCode).json(deletedUser.data)
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
