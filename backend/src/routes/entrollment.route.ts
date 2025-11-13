import { Router } from "express";
import { enrollController } from "../controllers/enrollment.controller";

export const enrollRoute = Router();

enrollRoute.get("/", enrollController.getEnrollment);


