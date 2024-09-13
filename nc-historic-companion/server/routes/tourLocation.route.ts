import { Router } from "express";
import tourLocationController from "../controller/tourLocation.controller.ts";

const tourLocationRouter = Router();

tourLocationRouter.get('/', tourLocationController.getAlltourLocations);

export default tourLocationRouter;