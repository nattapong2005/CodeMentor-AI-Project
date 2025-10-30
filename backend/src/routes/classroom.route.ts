import { Router } from "express";
import { classroomController } from "../controllers/classroom.controller";

export const classroomRoute = Router();

classroomRoute.get("/", classroomController.getAllClassroom);
classroomRoute.get("/:class_id", classroomController.getClassroomById);
classroomRoute.post("/", classroomController.createClassroom);
classroomRoute.put("/:class_id", classroomController.updateClassroom);
classroomRoute.delete("/:class_id", classroomController.deleteClassroom);
