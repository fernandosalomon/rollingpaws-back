const UserModel = require("../models/user.model");
const bcrypt = require(`bcrypt`);
const jwt = require("jsonwebtoken");
const cloudinary = require("../helpers/cloudinary.config");
const { welcomeTemplateMail, forgotPasswordTemplateMail } = require("../helpers/mails.template");

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
          const userFullName = registeredUser.firstName + " " + registeredUser.lastName;
          welcomeTemplateMail(userFullName, registeredUser.email);
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
      if (userExist.banned) {
        return {
          message: "Usuario no habilitado. Contactate con un administrador",
          statusCode: 401,
        };
      } else {
        if (bcrypt.compareSync(body.password, userExist.password)) {
          const payload = {
            id: userExist._id,
            role: userExist.role,
          }

          const token = jwt.sign(payload, process.env.JWT_SECRET);

          return {
            role: userExist.role,
            token: token,
            statusCode: 200,
          };

        } else {
          return {
            message: "Usuario y/o contraseña incorrectos. P",
            statusCode: 400,
          };
        }
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
        message: `El usuario fue ${!userExist.banned ? "bloqueado" : "desbloqueado"
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

const updateUserPicService = async (userID, file) => {
  try {
    const user = await UserModel.findById(userID);
    const profilePic = await cloudinary.uploader.upload(file.path)

    user.profilePic = profilePic.secure_url;
    const updatedUser = await user.save();

    return {
      data: profilePic.secure_url,
      statusCode: 200
    }

  } catch (error) {
    console.log(error)
    return {
      message: `Ocurrio un error tratando de cargar la imagen del usuario.`,
      statusCode: 500,
    };
  }
}

const changePasswordService = async (token, body) => {
  const { id, ...rest } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const userData = await UserModel.findById(id);
    if (bcrypt.compareSync(body.oldPassword, userData.password)) {
      const isPasswordStrong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(body.newPassword);

      if (isPasswordStrong) {
        try {
          const salt = bcrypt.genSaltSync(10);
          const password = bcrypt.hashSync(body.newPassword, salt);
          const changePassword = await UserModel.findByIdAndUpdate(id, { password: password });
          if (changePassword) {
            return {
              data: "La contraseña se modificó con exito.",
              statusCode: 200,
            }
          } else {
            return {
              data: "Hubo un error al tratar de cambiar la contraseña.",
              statusCode: 500,
            }
          }
        } catch (error) {
          console.log(error)
          return {
            data: "Hubo un error tratando de cambiar la contraseña.",
            statusCode: 500,
          }
        }
      } else {
        return {
          data: "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
          statusCode: 400,
        }
      }
    } else {
      return {
        data: "La contraseña ingresada es incorrecta",
        statusCode: 400,
      }
    }
  } catch (error) {
    return {
      data: "Error obteniendo la información del usuario de la base de datos",
      statusCode: 500,
    }
  }
}

const changePasswordWithTokenService = async (token, body) => {
  const { id, ...rest } = jwt.verify(token, process.env.JWT_SECRET);

  try {
    const isPasswordStrong = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(body.newPassword);

    if (isPasswordStrong) {
      try {
        const salt = bcrypt.genSaltSync(10);
        const password = bcrypt.hashSync(body.newPassword, salt);
        const changePassword = await UserModel.findByIdAndUpdate(id, { password: password });
        if (changePassword) {
          return {
            data: "La contraseña se modificó con exito.",
            statusCode: 200,
          }
        } else {
          return {
            data: "Hubo un error al tratar de cambiar la contraseña.",
            statusCode: 500,
          }
        }
      } catch (error) {
        console.log(error)
        return {
          data: "Hubo un error tratando de cambiar la contraseña.",
          statusCode: 500,
        }
      }
    } else {
      return {
        data: "La contraseña debe contener al menos 8 caracteres, una mayuscula, una minuscula, un número y un caracter especial (@$!%*?&)",
        statusCode: 400,
      }
    }
  } catch (error) {
    return {
      data: "Error obteniendo la información del usuario de la base de datos",
      statusCode: 500,
    }
  }
}

const forgotPasswordService = async (email) => {
  try {
    const userExist = await UserModel.findOne({ email: email });

    if (userExist) {
      const payload = {
        id: userExist._id,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET);

      const resetPasswordEmail = await forgotPasswordTemplateMail(userExist.email, userExist.email, token);


      return {
        data: "Se ha mandado un mail a la casilla de correo del usuario",
        statusCode: 200,
      }
    }
  } catch (error) {
    return {
      data: "Error obteniendo la información del usuario de la base de datos",
      statusCode: 500,
    }
  }
}

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
  updateUserPicService,
  changePasswordService,
  changePasswordWithTokenService,
  forgotPasswordService,
  deleteUserByIdService,
};
