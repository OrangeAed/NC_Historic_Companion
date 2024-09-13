import { Router } from "express";
import tourLocationController from "../controller/tourLocation.controller.ts";
import tourController from "../controller/tour.controller.ts";

const routes = Router();

routes.use('/tourLocations', tourLocationController);
routes.use('/tours', tourController);

export default routes;