import { Router } from "express";
import { authController } from "../controllers/auth.controller";

export const authRoute = Router();

authRoute.post("/login", authController.login);
authRoute.post("/register", authController.register);
authRoute.post("/logout", authController.logout);