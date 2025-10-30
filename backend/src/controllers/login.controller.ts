import type { Response, Request } from "express";
import prisma from "../database/db";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { loginSchema } from "../types/login";
const JWT_SECRET = process.env.JWT_SECRET || "defaultjwtsecreteieie2025krtktirti#$*#**$#$**#$";

export const loginController = {
    login: async (req: Request, res: Response) => {
        try {
            
            const result = loginSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง"});
            }
            const { email, password } = result.data;
      
            const user = await prisma.users.findUnique({
                where: { email },
            });
            if (!user) {
                return res.status(401).json({ message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" });
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
            }
            const payload = {
                user_id: user.user_id,
                role: user.role,
            }
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            return res.status(200).json({ message: "เข้าสู่ระบบสําเร็จ", token, user_id: user.user_id, role: user.role });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    }   
}