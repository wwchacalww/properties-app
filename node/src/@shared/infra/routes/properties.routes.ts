import { Router } from "express";
import { ImportPropertiesController } from "../../../properties/usecases/import/import-properties.controller";
import uploadConfig from "../../../config/upload";
import multer from "multer";
import { ListAllPropertiesController } from "../../../properties/usecases/list-all/list-all-properties.controller";
import { ListByRoomPropertiesController } from "../../../properties/usecases/list-by-room/list-by-room-properties.controller";
import { SearchByDescriptionPropertiesController } from "../../../properties/usecases/search-by-description/search-by-description-properties.controller";
import { SearchPropertiesController } from "../../../properties/usecases/search/search-properties.controller";

const propertiesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

const importController = new ImportPropertiesController();
const listAllController = new ListAllPropertiesController();
const listByRoomController = new ListByRoomPropertiesController();
const searchByDescriptionController =
  new SearchByDescriptionPropertiesController();
const searchProperties = new SearchPropertiesController();

propertiesRoutes.post(
  "/import",
  upload.single("file"),
  importController.handle
);

propertiesRoutes.get("/all", listAllController.handle);
propertiesRoutes.get("/list-by-room", listByRoomController.handle);
propertiesRoutes.get(
  "/search-by-description",
  searchByDescriptionController.handle
);
propertiesRoutes.get("/search", searchProperties.handle);

export { propertiesRoutes };
