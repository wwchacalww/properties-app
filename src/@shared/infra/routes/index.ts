import { Router } from "express";
import { propertiesRoutes } from "./properties.routes";

const routes = Router();

routes.use("/properties", propertiesRoutes);

export { routes };
