const ServiceModel = require("../models/services.model")
const { getAllServicesService, updateServiceService, createNewServiceService, deleteServiceService, updateImageService } = require("../services/services.services")

const getAllServicesController = async (req, res) => {
    try {
        const services = await getAllServicesService();
        res.status(services.statusCode).json(services.data);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const createNewServiceController = async (req, res) => {
    try {
        const newService = await createNewServiceService(req.body);
        if (newService.statusCode === 200) {
            res.status(newService.statusCode).json({ message: newService.message, data: newService.data });
        } else {
            res.status(newService.statusCode).json({ message: newService.message });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const updateServiceController = async (req, res) => {
    try {
        const updatedService = await updateServiceService(req.params.serviceID, req.body);
        res.status(updatedService.statusCode).json(updatedService.message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const updateImageController = async (req, res) => {
    try {
        const imageService = await updateImageService(req.params.serviceID, req.file);
        imageService.statusCode === 200
            ? res.status(imageService.statusCode).json(imageService.data)
            : res.status(imageService.statusCode).json(imageService.message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

const deleteServiceController = async (req, res) => {
    const serviceID = req.params.serviceID || null;

    if (serviceID) {
        try {
            const deletedService = await deleteServiceService(serviceID);
            res.status(deletedService.statusCode).json(deletedService.message);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    } else {
        res.status(400).json({ message: "ID del servicio no encontrado." })
    }


}

module.exports = {
    getAllServicesController,
    createNewServiceController,
    updateServiceController,
    updateImageController,
    deleteServiceController,
}