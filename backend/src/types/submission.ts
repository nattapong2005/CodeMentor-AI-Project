import {z} from "zod";
export const submissionSchema = z.object({
     submission_id: z.string(),
     code: z.string(),
     submitted_at: z.string(),
     status: z.enum(["Submitted", "Grading", "Graded"]),
     score: z.number(),
     ai_feedback: z.string().optional(),
     teacher_feedback: z.string().optional(),
     assignment_id: z.string(),
     student_id: z.string(),
});

export const createSubmissionSchema = submissionSchema.omit({ submission_id: true });
export const updateSubmissionSchema = submissionSchema.partial();




