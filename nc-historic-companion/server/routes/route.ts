import { Router } from "express";
import locationController from "../controller/location.controller.ts";
import tourController from "../controller/tour.controller.ts";

const routes = Router();

routes.use('/locations', locationController);
routes.use('/tours', tourController);

export default routes;