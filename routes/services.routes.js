const { Router } = require("express");
const { getAllServicesController, createNewServiceController, updateServiceController, deleteServiceController } = require("../controllers/services.controllers");
const router = Router();

router.get("/", getAllServicesController);

router.post("/:serviceID", createNewServiceController);

router.put("/:serviceID", updateServiceController);

router.delete("/:serverID", deleteServiceController);


module.exports = router;