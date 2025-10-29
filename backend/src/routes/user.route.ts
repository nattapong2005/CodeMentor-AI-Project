import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRoute = Router();

userRoute.get("/", userController.getAllUser);
userRoute.get("/:id", userController.getUserById);
