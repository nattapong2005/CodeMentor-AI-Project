import { Router } from "express";
import { submissionController } from './../controllers/submission.controller';

export const submissionRoute = Router();

submissionRoute.get("/", submissionController.getAllSubmission);
submissionRoute.get("/:submission_id", submissionController.getSubmissionById);
submissionRoute.post("/", submissionController.createSubmission);
submissionRoute.put("/:submission_id", submissionController.updateSubmission);
submissionRoute.delete("/:submission_id", submissionController.deleteSubmission);
