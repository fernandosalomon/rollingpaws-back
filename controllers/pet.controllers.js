const PetModel = require("../models/pet.model");
const {
  getAllPetsService,
  getPetByIdService,
  createNewPetService,
  updatePetService,
  deletePetByIdService,
} = require("../services/pets.services");

const getAllPetsController = async (req, res) => {
  try {
    const pets = await getAllPetsService();
    res.status(200).json(pets);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPetByIdController = async (req, res) => {
  try {
    const pet = await getPetByIdService(req.params.petID);
    pet.statusCode === 200
      ? res.status(pet.statusCode).json(pet.petData)
      : res.status(pet.statusCode).json(pet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNewPetController = async (req, res) => {
  try {
    const createdPet = await createNewPetService(req.body);
    createdPet.statusCode === 201
      ? res.status(createdPet.statusCode).json(createdPet.petData)
      : res.status(createdPet.statusCode).json(createdPet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const updatePetController = async (req, res) => {
  try {
    const updatedPet = await updatePetService(req.params.petID, req.body);
    updatedPet.statusCode === 200
      ? res.status(updatedPet.statusCode).json(updatedPet.petData)
      : res.status(updatedPet.statusCode).json(updatedPet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const deletePetByIdController = async (req, res) => {
  try {
    const deletedPet = await deletePetByIdService(req.params.petID);
    deletedPet.statusCode === 200
      ? res.status(deletedPet.statusCode).json(deletedPet.petData)
      : res.status(deletedPet.statusCode).json(deletedPet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllPetsController,
  getPetByIdController,
  createNewPetController,
  updatePetController,
  deletePetByIdController,
};
