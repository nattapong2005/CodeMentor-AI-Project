import type { Response, Request } from "express";
import prisma from "../database/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fghfKDSJJfgrk#U$Y#@#($($4564553485734A";

export const enrollController = {
    getAllEnrollment: async (req: Request, res: Response) => {
        try {
            const enrollment = await prisma.enrollment.findMany();
            if (!enrollment) {
                return res.status(404).json({ message: "ไม่พบการลงทะเบียน" });
            }
            return res.status(200).json(enrollment);
        } catch (err) {
            console.log(err)
        }
    },
    getEnrollmentById: async (req: Request, res: Response) => {
        try {
            const token = req.cookies.auth_token; 
            if (!token) return res.status(401).json({ message: "ไม่พบ Token" });
            const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
            const user_id = decoded.user_id; 

            const studentWithClasses = await prisma.users.findUnique({
                where: { user_id },
                include: {
                    enrollments: {
                        include: { classroom: true },
                    },
                },
            });
            if (!studentWithClasses) {
                return res.status(404).json({ message: "ไม่พบห้องเรียน" });
            }
            return res.status(200).json(studentWithClasses);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    },
}