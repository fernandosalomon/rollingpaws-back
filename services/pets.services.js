const PetModel = require("../models/pet.model");

const getAllPetsService = async () => {
  const pets = await PetModel.find();
  return pets;
};

const getPetByIdService = async (petID) => {
  try {
    const pet = await PetModel.findById(petID);
    return {
      petData: pet,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `No se pudo obtener información de la base de datos. Error: ${error}`,
      statusCode: 500,
    };
  }
};

const createNewPetService = async (body) => {
  const { name, species, breed, sex, color, height, weight, observations } =
    body;

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
      weight,
      height,
      observations,
    });

    try {
      const createdPet = await newPet.save();
      return {
        petData: createdPet,
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);
      return {
        message: `Se produjo un error al tratar de crear la nueva mascota. Error: ${error}`,
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
      }; // Esto se puede hacer con getUserByIdService()
    } else {
      const updatedPet = await PetModel.findByIdAndUpdate(petID, body, {
        new: true,
      });
      return { petData: updatedPet, statusCode: 200 };
    }
  } catch (error) {
    console.log(error);
    return {
      message: `Ocurrio un error tratando de actualizar los datos de la mascota. Error: ${error}`,
      statusCode: 500,
    };
  }
};

const deletePetByIdService = async (petID) => {
  try {
    const deletedPet = await PetModel.findByIdAndDelete(petID);
    return {
      petData: deletedPet,
      statusCode: 200,
    };
  } catch (error) {
    console.log(error);
    return {
      message: `Ocurrio un error tratando de eliminar la mascota. Error: ${error}`,
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
