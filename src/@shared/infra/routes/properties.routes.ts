import { Router } from "express";
import { ImportPropertiesController } from "../../../properties/usecases/import/import-properties.controller";
import uploadConfig from "../../../config/upload";
import multer from "multer";

const propertiesRoutes = Router();
const upload = multer(uploadConfig.upload("./tmp"));

const ImportController = new ImportPropertiesController();

propertiesRoutes.post(
  "/import",
  upload.single("file"),
  ImportController.handle
);

export { propertiesRoutes };
