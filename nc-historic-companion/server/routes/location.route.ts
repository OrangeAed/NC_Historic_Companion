import { Router } from "express";
import locationController from "../controller/location.controller.ts";

const locationRouter = Router();

locationRouter.get('/', locationController.getAllLocations);

export default locationRouter;