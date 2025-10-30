import {z} from "zod";
export const classSchema = z.object({
    class_id: z.string(),
    class_name: z.string().min(1, { message: "กรุณากรอกชื่อห้องเรียน" }),   
    description: z.string().min(1, { message: "กรุณากรอกรายละเอียดห้อง" }), 
    teacher_id: z.string().min(1, { message: "กรุณากรอกไอดีอาจารย์" }),  
});

export const createClassroomSchema = classSchema.omit({ class_id: true });
export const updateClassroomSchema = classSchema.partial();
