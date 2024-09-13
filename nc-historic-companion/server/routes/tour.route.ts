import { Router } from "express";
import tourController from "../controller/tour.controller.ts";

const tourRouter = Router();

tourRouter.get('/', tourController.getAllTours);

export default tourRouter;