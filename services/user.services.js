const UserModel = require("../models/user.model");
const bcrypt = require(`bcrypt`);

const getAllUsersService = async () => {
  const users = await UserModel.find().populate("pets");
  return users;
};

const getUserByIdService = async (userID) => {
  const user = await UserModel.findById(userID).populate("pets");
  if (!user) {
    return {
      message: "Usuario no encotrado",
      statusCode: 200,
    };
  } else {
    return { userData: user, statusCode: 200 };
  }
};

const createNewUserService = async (body) => {
  const { fullname, email, password, phone, address } = body;

  if (!fullname || !email || !password) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const newUser = new UserModel({
      fullname,
      email,
      password,
      phone,
      address,
    });

    const salt = bcrypt.genSaltSync(10);

    newUser.password = bcrypt.hashSync(newUser.password, salt);

    const registerUser = await newUser.save();
    return {
      registerUser,
      statusCode: 201,
    };
  }
};

const updateUserService = async (userID, body) => {
  try {
    const userExist = await UserModel.findById(userID);

    if (!userExist) {
      return {
        message: "El ID no corresponde con ningún usuario registrado",
        statusCode: 400,
      }; // Esto se puede hacer con getUserByIdService()
    } else {
      const updateUser = await UserModel.findByIdAndUpdate(userID, body, {
        new: true,
      });
      const errors = updateUser.validateSync();

      if (errors) {
        return {
          message: `Error al actualizar información del usuario. Uno o más campos contienen un formato incorrecto`,
          statusCode: 400,
        };
      } else {
        return { userData: updateUser, statusCode: 200 };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      message: `Ocurrio un error tratando de actualizar los datos del usuario. Error: ${error}`,
      statusCode: 500,
    };
  }
};

const deleteUserByIdService = async (userID) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userID);
    return {
      userData: deletedUser,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Ocurrio un error tratando de eliminar el usuario. Error: ${error}`,
      statusCode: 500,
    };
  }
};

module.exports = {
  getAllUsersService,
  getUserByIdService,
  createNewUserService,
  updateUserService,
  deleteUserByIdService,
};
