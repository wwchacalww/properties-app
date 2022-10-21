import { Router } from "express";
import { ImportPropertiesController } from "../../../properties/usecases/import/import-properties.controller";
import uploadConfig from "../../../config/upload";
import multer from "multer";
import { ListAllPropertiesController } from "../../../properties/usecases/list-all/list-all-properties.controller";
import { ListByRoomPropertiesController } from "../../../properties/usecases/list-by-room/list-by-room-properties.controller";

const propertiesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

const importController = new ImportPropertiesController();
const listAllController = new ListAllPropertiesController();
const listByRoomController = new ListByRoomPropertiesController();

propertiesRoutes.post(
  "/import",
  upload.single("file"),
  importController.handle
);

propertiesRoutes.get("/all", listAllController.handle);
propertiesRoutes.get("/list-by-room", listByRoomController.handle);

export { propertiesRoutes };
