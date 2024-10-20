const PetModel = require("../models/pet.model");

const getAllPetsService = async () => {
  const pets = await PetModel.find();
  return pets;
};

module.exports = {
  getAllPetsService,
};
