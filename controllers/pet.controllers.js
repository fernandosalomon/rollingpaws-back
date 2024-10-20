const PetModel = require("../models/pet.model");
const { getAllPetsService } = require("../services/pets.services");

const getAllPetsController = async (req, res) => {
  try {
    const pets = await getAllPetsService();
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllPetsController,
};
