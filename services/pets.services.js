const PetModel = require("../models/pet.model");
const UserModel = require("../models/user.model");

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

const createNewPetService = async (body) => {
  const {
    name,
    species,
    breed,
    sex,
    color,
    height,
    weight,
    observations,
    owner,
  } = body;

  if (!name || !species) {
    return {
      message: "Faltan completar campos obligatorios",
      statusCode: 400,
    };
  } else {
    const newPet = new PetModel({
      name,
      species,
      breed,
      sex,
      color,
      weight,
      height,
      observations,
      owner,
    });

    try {
      const createdPet = await newPet.save();

      const ownerData = await UserModel.findById(owner);
      ownerData.pets.push(createdPet._id);
      try {
        const updatedPetsUser = await UserModel.findByIdAndUpdate(
          owner,
          ownerData,
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
  createNewPetService,
  updatePetService,
  deletePetByIdService,
};
