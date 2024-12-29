const ServiceModel = require("../models/services.model")

const getAllServicesService = async () => {
    try {
        const services = await ServiceModel.find();
        return {
            data: services,
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
}

const createNewServiceService = async (serviceID, body) => {
    try {
        const newService = await ServiceModel.findById(serviceID, body);
        return {
            data: newService,
            message: "Servicio creado con exito.",
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
}

const updateServiceService = async (serviceID, body) => {
    try {
        const updatedService = await ServiceModel.findById(serviceID, body);
        return {
            data: updatedService,
            message: "Servicio modificado con exito.",
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
}

const deleteServiceController = async (serviceID) => {
    try {
        const deletedService = await ServiceModel.findByIdAndDelete(serviceID);
        return {
            data: deletedService,
            message: "Servicio eliminado con exito.",
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
}

module.exports = {
    getAllServicesService,
    createNewServiceService,
    updateServiceService,
    deleteServiceController,
}