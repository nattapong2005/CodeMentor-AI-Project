import type { Response, Request } from "express";
import prisma from "../database/db";
import bcrypt from "bcryptjs";
import { createUserSchema, updateUserSchema, userSchema } from "../types/user";


export const userController = {
    getAllUser: async (req: Request, res: Response) => {
        try {
            const user = await prisma.users.findMany();
            if (!user) {
                return res.status(404).json({ message: "ไม่พบผู้ใช้" });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err)
        }
    },
    getUserById: async (req: Request, res: Response) => {
        try {
            const { user_id } = req.params;
            const user = await prisma.users.findUnique({
                where: { user_id: user_id as string },
            });
            if (!user) {
                return res.status(404).json({ message: "ไม่พบผู้ใช้" });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err)
        }
    },
    createUser: async (req: Request, res: Response) => {
        try {
            const result = createUserSchema.safeParse(req.body);
            console.log(req.body)
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
            }
            const { name, lastname, email, password, role } = result.data;
            const existingUser = await prisma.users.findUnique({
                where: { email },
            });
            if (existingUser) {
                return res.status(400).json({ message: "อีเมลนี้ถูกใช้ไปแล้ว" });
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = await prisma.users.create({
                data: {
                    name,
                    lastname,
                    email,
                    password: hashedPassword,
                    role,
                },
            });
            if (!user) {
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในการสร้างผู้ใช้" });
            }
            return res.status(201).json({ message: "สร้างผู้ใช้สำเร็จ", user });
        } catch (err) {
            console.log(err)
        }
    },
    updateUser: async (req: Request, res: Response) => {
        try {
            const result = updateUserSchema.safeParse(req.body);
            const { user_id } = req.params;
            if (!user_id) {
                return res.status(400).json({ message: "กรุณาระบุ user_id" });
            }
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
            }

            const { name, lastname, email, password, role } = result.data;
            const user = await prisma.users.update({
                where: { user_id },
                data: {
                    name,
                    lastname,
                    email,
                    password,
                    role,
                },
            });
            if (!user) {
                return res.status(404).json({ message: "ไม่พบผู้ใช้" });
            }
            return res.status(200).json({ message: "อัพเดตผู้ใช้สําเร็จ", user });
        } catch (err) {
            console.log(err)
        }
    },
    deleteUser: async (req: Request, res: Response) => {
        try {
            const { user_id } = req.params;
            if (!user_id) {
                return res.status(400).json({ message: "กรุณาระบุ user_id" });
            }
            const user = await prisma.users.delete({
                where: { user_id },
            });
            if (!user) {
                return res.status(404).json({ message: "ไม่พบผู้ใช้" });
            }
            return res.status(200).json({ message: "ลบผู้ใช้สําเร็จ" });
        } catch (err) {
            console.log(err)
        }
    }
}