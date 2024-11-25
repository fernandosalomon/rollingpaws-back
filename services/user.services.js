const UserModel = require("../models/user.model");
const bcrypt = require(`bcrypt`);
const jwt = require("jsonwebtoken");

const getAllUsersService = async (userID) => {
  try {
    const users = await UserModel.find({
      _id: { $ne: userID },
    }).populate("pets");
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
  const { firstName, lastName, email, password, phone, address } = body;

  if (!firstName || !lastName || !email || !password) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const userExists = await UserModel.findOne({ email: email });
    if (!userExists) {
      if (
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&áéíóúÁÉÍÓÚñÑ]).{8,}$/.test(
          password
        )
      ) {
        const newUser = new UserModel({
          firstName,
          lastName,
          email,
          password,
          phone,
          address,
        });
        const salt = bcrypt.genSaltSync(10);

        newUser.password = bcrypt.hashSync(newUser.password, salt);

        const payload = {
          id: newUser._id,
          role: newUser.role,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET);

        try {
          const registeredUser = await newUser.save();
          return {
            data: registeredUser,
            token: token,
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

const loginUserService = async (body) => {
  try {
    const userExist = await UserModel.findOne({ email: body.email });
    if (userExist) {
      if (bcrypt.compareSync(body.password, userExist.password)) {
        if (!userExist.logged) {
          const payload = {
            id: userExist._id,
            role: userExist.role,
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET);

          const isLogged = await UserModel.findOneAndUpdate(
            { _id: userExist._id },
            { logged: true },
            { new: true }
          );

          return {
            role: userExist.role,
            token: token,
            statusCode: 200,
          };
        } else {
          return {
            message: "El usuario ya se encuentra identificado en otra sesión",
            statusCode: 400,
          };
        }
      } else {
        return {
          message: "Usuario y/o contraseña incorrectos. P",
          statusCode: 400,
        };
      }
    } else {
      return {
        message: "Usuario y/o contraseña incorrectos. U",
        statusCode: 400,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message: "No se pudo conectar con la base de datos",
      statusCode: 500,
    };
  }
};

const logoutUserService = async (userID) => {
  try {
    const logout = await UserModel.findOneAndUpdate(
      { _id: userID },
      { logged: false },
      { new: true }
    );
    return {
      message: "La sesión se cerró con exito",
      statusCode: 200,
    };
  } catch (error) {
    return {
      message: "Hubo un error al tratar de cerrar sesión",
      statusCode: 500,
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

const banUserService = async (userID) => {
  try {
    const userExist = await UserModel.findById(userID);

    if (!userExist) {
      return {
        message: "El ID no corresponde con ningún usuario registrado",
        statusCode: 400,
      };
    } else {
      const updatedUser = await UserModel.findByIdAndUpdate(
        userID,
        { banned: !userExist.banned },
        {
          new: true,
        }
      );
      return {
        message: `El usuario fue ${
          !userExist.banned ? "bloqueado" : "desbloqueado"
        } con exito`,
        statusCode: 200,
      };
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
  loginUserService,
  logoutUserService,
  updateUserService,
  banUserService,
  deleteUserByIdService,
};
