import { z } from "zod";

export const userSchema = z.object({
    user_id: z.string(),
    name: z.string().min(1, { message: "กรุณากรอกชื่อ" }),
    lastname: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
    email: z.string().email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
    password: z.string(),   
    role: z.enum(["ADMIN", "TEACHER", "STUDENT"], {
        message: "บทบาทผู้ใช้ไม่ถูกต้อง"
    }),
});

export const createUserSchema = userSchema.omit({ user_id: true });
export const updateUserSchema = userSchema.partial();
