import { Router } from "express";
import { userController } from "../controllers/user.controller";

export const userRoute = Router();

userRoute.get("/me", userController.getMe);
userRoute.get("/", userController.getAllUser);
userRoute.get("/:user_id", userController.getUserById);
userRoute.post("/", userController.createUser);
userRoute.put("/:user_id", userController.updateUser);
userRoute.delete("/:user_id", userController.deleteUser);
