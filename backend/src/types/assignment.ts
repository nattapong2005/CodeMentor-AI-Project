import { z } from "zod";

export const assignmentSchema = z.object({
    assignment_id: z.string(),
    title: z.string().min(1, { message: "กรุณากรอกหัวข้อ" }),
    score: z.int(),
    description: z.string().min(1, { message: "กรุณากรอกรายละเอียด" }),
    due_date: z.string(),
    create_at: z.date().optional(),   
    feedback_level: z.enum(["Hint", "Concept", "Answer", "None"]),
    class_id: z.string(),
});

export const createAssignmentSchema = assignmentSchema.omit({ assignment_id: true });
export const updateAssignmentSchema = assignmentSchema.partial();


