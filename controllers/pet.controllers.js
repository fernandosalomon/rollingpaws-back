const PetModel = require("../models/pet.model");

const {
  getAllPetsService,
  getPetByIdService,
  createNewPetService,
  updatePetService,
  deletePetByIdService,
  getAllPetsFromUserService,
} = require("../services/pets.services");

const jwt = require("jsonwebtoken");

const getAllPetsController = async (req, res) => {
  try {
    const pets = await getAllPetsService();
    pets.statusCode === 200
      ? res.status(pets.statusCode).json(pets.data)
      : res.status(pets.statusCode).json(pets.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getPetByIdController = async (req, res) => {
  try {
    const pet = await getPetByIdService(req.params.petID);
    pet.statusCode === 200
      ? res.status(pet.statusCode).json(pet.data)
      : res.status(pet.statusCode).json(pet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const getAllPetsFromUserController = async (req, res) => {
  let userID = null;
  if (req.params.userID) {
    userID = req.params.userID;
  } else if (req.headers.authtoken) {
    const token = req.headers.authtoken;
    userID = jwt.verify(token, process.env.JWT_SECRET).id;
  } else {
    res.status(400).json({ message: "BAD REQUEST: Usuario no especificado" });
    return null;
  }
  try {
    const pet = await getAllPetsFromUserService(userID);
    pet.statusCode === 200
      ? res.status(pet.statusCode).json(pet.data)
      : res.status(pet.statusCode).json(pet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const createNewPetController = async (req, res) => {
  const token = req.headers.authtoken;
  const userID = jwt.verify(token, process.env.JWT_SECRET).id;
  try {
    const createdPet = await createNewPetService(req.body, userID);
    createdPet.statusCode === 201
      ? res.status(createdPet.statusCode).json(createdPet.data)
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
      ? res.status(updatedPet.statusCode).json(updatedPet.data)
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
      ? res.status(deletedPet.statusCode).json(deletedPet.data)
      : res.status(deletedPet.statusCode).json(deletedPet.message);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = {
  getAllPetsController,
  getPetByIdController,
  getAllPetsFromUserController,
  createNewPetController,
  updatePetController,
  deletePetByIdController,
};
