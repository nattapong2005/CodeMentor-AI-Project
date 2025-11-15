import { Router } from "express";
import { enrollController } from "../controllers/enrollment.controller";

export const enrollRoute = Router();

enrollRoute.get("/", enrollController.getAllEnrollment);
enrollRoute.get("/my", enrollController.getEnrollmentById);