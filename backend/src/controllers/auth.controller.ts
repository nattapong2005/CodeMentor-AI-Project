import type { Response, Request } from "express";
import prisma from "../database/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { loginSchema } from "../types/login";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "fghfKDSJJfgrk#U$Y#@#($($4564553485734A";

export const authController = {
    login: async (req: Request, res: Response) => {
        try {
            const result = loginSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง" });
            }

            const { email, password } = result.data;
            const user = await prisma.users.findUnique({ where: { email } });
            // console.log(user)
            if (!user) {
                return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" });
            }

            const payload = { user_id: user.user_id, role: user.role };
            const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
            const serializedCookie = cookie.serialize("auth_token", token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                secure: false,
                path: "/",
                maxAge: 60 * 60,
            });
            res.setHeader("Set-Cookie", serializedCookie);
            
            return res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", user_id: user.user_id, role: user.role, token: token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
        }
    },
    register: async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await prisma.users.create({
                data: {
                    email,
                    password: hashedPassword,
                },
            });
            return res.status(201).json({ message: "สมัครสมาชิกสําเร็จ", user_id: user.user_id });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์" });
        }
    },
    logout: async (req: Request, res: Response) => {
        res.setHeader(
            "Set-Cookie",
            cookie.serialize("auth_token", "", {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                maxAge: 0,
            })
        );
        return res.status(200).json({ message: "ออกจากระบบสำเร็จ" });
    },
    me: async (req: Request, res: Response) => {
        if (!req.user) {
            return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้" });
        }
        return res.status(200).json(req.user);
    }
};
