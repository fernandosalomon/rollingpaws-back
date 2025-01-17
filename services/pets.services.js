const PetModel = require("../models/pet.model");
const UserModel = require("../models/user.model");
const cloudinary = require("../helpers/cloudinary.config")

const getAllPetsService = async () => {
  try {
    const pets = await PetModel.find().populate("owner");
    return {
      data: pets,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error tratando de recuperar los datos de la base de datos.",
      statusCode: 500,
    };
  }
};

const getPetByIdService = async (petID) => {
  try {
    const pet = await PetModel.findById(petID).populate("owner");

    if (!pet) {
      return {
        message:
          "El ID proporcionado no corresponde con ninguna mascota registrada.",
        statusCode: 400,
      };
    } else {
      return {
        data: pet,
        statusCode: 200,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error tratando de recuperar los datos de la base de datos.",
      statusCode: 500,
    };
  }
};

const getAllPetsFromUserService = async (userID) => {
  try {
    const user = await UserModel.findById(userID).populate("pets");

    return {
      data: user.pets,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message:
        "Hubo un error tratando de recuperar los datos de la base de datos.",
      statusCode: 500,
    };
  }
};

const createNewPetService = async (body, userID) => {
  const { name, specie, breed, sex, size, age, health, observations } = body;
  const owner = userID;

  if (!name || !specie) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const newPet = new PetModel({
      name,
      specie,
      breed,
      sex,
      size,
      age,
      health,
      observations,
      owner,
    });

    try {
      const createdPet = await newPet.save();
      try {
        const updatedPetsUser = await UserModel.findByIdAndUpdate(
          owner,
          { $push: { pets: createdPet._id } },
          { new: true }
        );
      } catch (error) {
        console.log(error);
        PetModel.findByIdAndDelete(createdPet._id);
        return {
          message:
            "Hubo un error al tratar de asignar la mascota al dueño. La mascota no pudo ser creada.",
          statusCode: 500,
        };
      }
      return {
        data: createdPet,
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Se produjo un error al tratar de crear la nueva mascota.",
        statusCode: 500,
      };
    }
  }
};

const updatePetService = async (petID, body) => {
  try {
    const petExists = await PetModel.findById(petID);

    if (!petExists) {
      return {
        message:
          "El ID no corresponde con ninguna mascota añadida por el usuario",
        statusCode: 400,
      };
    } else {
      const updatedPet = await PetModel.findByIdAndUpdate(petID, body, {
        new: true,
      });
      return { data: updatedPet, statusCode: 200 };
    }
  } catch (error) {
    console.log(error);
    return {
      message:
        "Ocurrio un error tratando de actualizar los datos de la mascota.",
      statusCode: 500,
    };
  }
};

const updatePetPicService = async (petID, file) => {
  try {
    const pet = await PetModel.findById(petID);
    const petImage = await cloudinary.uploader.upload(file.path)

    pet.image = petImage.secure_url;
    const updatedPet = await pet.save();

    return {
      data: petImage.secure_url,
      statusCode: 200
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Ocurrio un error tratando de cargar la imagen de la mascota.",
      statusCode: 500,
    };
  }
}

const deletePetByIdService = async (petID) => {
  try {
    const deletedPet = await PetModel.findByIdAndDelete(petID);
    return {
      data: deletedPet,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: "Ocurrio un error tratando de eliminar la mascota.",
      statusCode: 500,
    };
  }
};

module.exports = {
  getAllPetsService,
  getPetByIdService,
  getAllPetsFromUserService,
  createNewPetService,
  updatePetService,
  updatePetPicService,
  deletePetByIdService,
};
