const ServiceModel = require("../models/services.model")
const { getAllServicesService, updateServiceService, createNewServiceService, deleteServiceService } = require("../services/services.services")

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
        const newService = await createNewServiceService(req.params.serviceID, req.body);
        res.status(newService.statusCode).json(newService.message);
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

const deleteServiceController = async (req, res) => {
    try {
        const deletedService = await deleteServiceService(req.params.serviceID, req.body);
        res.status(deletedService.statusCode).json(deletedService.message);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

model.exports = {
    getAllServicesController,
    createNewServiceController,
    updateServiceController,
    deleteServiceController,
}