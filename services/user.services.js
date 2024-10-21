const UserModel = require("../models/user.model");
const bcrypt = require(`bcrypt`);

const getAllUsersService = async () => {
  try {
    const users = await UserModel.find().populate("pets");
    return {
      data: users,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `No pudimos conectar con la base de datos.`,
      statusCode: 500,
    };
  }
};

const getUserByIdService = async (userID) => {
  try {
    const user = await UserModel.findById(userID).populate("pets");

    if (!user) {
      return {
        message: "El ID no corresponde con un usuario registrado.",
        statusCode: 400,
      };
    } else {
      return { data: user, statusCode: 200 };
    }
  } catch (error) {
    console.log(error);
    return {
      message: `No pudimos conectar con la base de datos.`,
      statusCode: 500,
    };
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
    const userExists = await UserModel.findOne({ email: email });
    console.log(userExists);
    if (!userExists) {
      if (
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&áéíóúÁÉÍÓÚñÑ]).{8,}$/.test(
          password
        )
      ) {
        const newUser = new UserModel({
          fullname,
          email,
          password,
          phone,
          address,
        });
        const salt = bcrypt.genSaltSync(10);

        newUser.password = bcrypt.hashSync(newUser.password, salt);

        try {
          const registeredUser = await newUser.save();
          return {
            data: registeredUser,
            statusCode: 201,
          };
        } catch (error) {
          console.log(error);
          return {
            message: "El nuevo usuario no pudo guardarse en la base de datos.",
            statusCode: 500,
          };
        }
      } else {
        return {
          message:
            "La contraseña debe contener al menos 8 caracteres, una letra mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
          statusCode: 400,
        };
      }
    } else {
      return {
        message: "El email corresponde con un usuario registrado.",
        statusCode: 400,
      };
    }
  }
};

const updateUserService = async (userID, body) => {
  try {
    const userExist = await UserModel.findById(userID);

    if (!userExist) {
      return {
        message: "El ID no corresponde con ningún usuario registrado",
        statusCode: 400,
      };
    } else {
      const updatedUser = await UserModel.findByIdAndUpdate(userID, body, {
        new: true,
      });
      const errors = updatedUser.validateSync();

      if (errors) {
        return {
          message:
            "Error al actualizar información del usuario. Uno o más de los campos proporcionados tienen errores",
          statusCode: 400,
        };
      } else {
        return { data: updatedUser, statusCode: 200 };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      message: `Ocurrio un error tratando de actualizar los datos del usuario.`,
      statusCode: 500,
    };
  }
};

const deleteUserByIdService = async (userID) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(userID);
    return {
      data: deletedUser,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Ocurrio un error tratando de eliminar el usuario.`,
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
