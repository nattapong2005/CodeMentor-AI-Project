import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "อีเมลไม่ถูกต้อง" }),
    password: z.string(),
});
export type LoginInput = z.infer<typeof loginSchema>;