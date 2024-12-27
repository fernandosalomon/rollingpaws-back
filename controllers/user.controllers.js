const UserModel = require("../models/user.model");
const {
  getAllUsersService,
  createNewUserService,
  getUserByIdService,
  updateUserService,
  deleteUserByIdService,
  loginUserService,
  logoutUserService,
  banUserService,
  updateUserPicService,
  changePasswordService,
  changePasswordWithTokenService,
  forgotPasswordService,
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

const getUserSelfDataController = async (req, res) => {
  const token = req.headers.authtoken;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;
  try {
    const user = await getUserByIdService(userID);
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

const loginUserController = async (req, res) => {
  try {
    const loggedUser = await loginUserService(req.body);
    loggedUser.statusCode === 200
      ? res
        .status(loggedUser.statusCode)
        .json({ token: loggedUser.token, role: loggedUser.role })
      : res.status(loggedUser.statusCode).json(loggedUser.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const logoutUserController = async (req, res) => {
  const token = req.headers.authtoken;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;

  try {
    const logoutUser = await logoutUserService(userID);
    res.status(logoutUser.statusCode).json(logoutUser.message);
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

const banUserController = async (req, res) => {
  try {
    const banUser = await banUserService(req.params.userID);
    res.status(banUser.statusCode).json(banUser.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updateUserPicController = async (req, res) => {
  try {
    const userPic = await updateUserPicService(req.params.userID, req.file);

    userPic.statusCode === 200
      ? res.status(userPic.statusCode).json(userPic.data)
      : res.status(userPic.statusCode).json(userPic.message);

  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

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

const changePasswordController = async (req, res) => {
  try {
    const token = req.headers.authtoken;

    if (!token) {
      res.status(401).json({ data: "Acceso denegado" })
    } else {
      const changePassword = await changePasswordService(token, req.body);
      res.status(changePassword.statusCode).json(changePassword.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const changePasswordWithTokenController = async (req, res) => {
  try {
    const token = req.headers.authtoken;

    if (!token) {
      res.status(401).json({ data: "Acceso denegado" })
    } else {
      const changePassword = await changePasswordWithTokenService(token, req.body);
      res.status(changePassword.statusCode).json(changePassword.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

const forgotPasswordController = async (req, res) => {
  try {
    const forgotPassword = await forgotPasswordService(req.body.email);
    res.status(forgotPassword.statusCode).json(forgotPassword.data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

module.exports = {
  getAllUsersController,
  getUserByIdController,
  getUserSelfDataController,
  createNewUserController,
  loginUserController,
  logoutUserController,
  updateUserController,
  banUserController,
  updateUserPicController,
  changePasswordController,
  changePasswordWithTokenController,
  forgotPasswordController,
  deleteUserByIdController,
};
