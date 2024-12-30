const { Router } = require("express");
const { getAllServicesController, createNewServiceController, updateServiceController, deleteServiceController, updateImageController } = require("../controllers/services.controllers");
const multer = require("../middlewares/multer");
const auth = require("../middlewares/auth");
const router = Router();

router.get("/", getAllServicesController);

router.post("/", auth("admin"), createNewServiceController);

router.put("/image/:serviceID", auth("admin"), multer.single("image"), updateImageController)
router.put("/:serviceID", auth("admin"), updateServiceController);

router.delete("/:serviceID", auth("admin"), deleteServiceController);


module.exports = router;