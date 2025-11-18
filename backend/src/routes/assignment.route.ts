import { Router } from "express";
import { assignmentController } from "../controllers/assignment.controller";

export const assignmentRoute = Router();

assignmentRoute.get("/", assignmentController.getAssignment);
assignmentRoute.get("/:assignment_id", assignmentController.getAssignmentById);
assignmentRoute.get("/a/:class_id", assignmentController.getAssignmentByClassId);
assignmentRoute.post("/", assignmentController.createAssignment);
assignmentRoute.put("/:assignment_id", assignmentController.updateAssignment);
assignmentRoute.delete("/:assignment_id", assignmentController.deleteAssignment);
