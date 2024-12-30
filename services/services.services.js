const ServiceModel = require("../models/services.model")
const cloudinary = require("../helpers/cloudinary.config")

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

const createNewServiceService = async (body) => {

    const { name, description, duration, image } = body

    try {
        if (!name || !description) {
            return {
                message: "Faltan campos obligatorios.",
                statusCode: 400,
            }
        } else {

            const newService = new ServiceModel({
                name,
                description,
                image: image || "",
                duration,
            })

            const res = await newService.save();

            return {
                data: res,
                message: "Servicio creado con exito.",
                statusCode: 200,
            };
        }
    } catch (error) {
        console.log(error);
        return {
            message:
                "Hubo un error al guardar el servicio en la base de datos.",
            statusCode: 500,
        };
    }
}

const updateServiceService = async (serviceID, body) => {
    try {
        const updatedService = await ServiceModel.findByIdAndUpdate(serviceID, body);
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

const updateImageService = async (serviceID, file) => {
    try {
        const service = await ServiceModel.findOne({ _id: serviceID });
        const serviceImage = await cloudinary.uploader.upload(file.path)

        service.image = serviceImage.secure_url;
        const updatedService = await service.save();

        return {
            data: serviceImage.secure_url,
            statusCode: 200
        }
    } catch (error) {
        console.log(error);
        return {
            message: "Ocurrio un error tratando de cargar la imagen del servicio.",
            statusCode: 500,
        };
    }
}

const deleteServiceService = async (serviceID) => {
    try {
        const deletedService = await ServiceModel.findByIdAndDelete(serviceID);
        if (deletedService) {
            return {
                data: deletedService,
                message: "Servicio eliminado con exito.",
                statusCode: 200,
            };
        } else {
            return {
                message: "El ID proporcionado es inválido",
                statusCode: 400,
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
}

module.exports = {
    getAllServicesService,
    createNewServiceService,
    updateServiceService,
    updateImageService,
    deleteServiceService,
}