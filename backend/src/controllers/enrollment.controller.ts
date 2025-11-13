import type { Response, Request } from "express";
import prisma from "../database/db";

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
            const { user_id } = req.params;
            const studentWithClasses = await prisma.users.findUnique({
                where: {
                    user_id: user_id as string,
                },
                include: {
                    enrollments: { // 1. ดึงข้อมูลการลงทะเบียน (Enrollment) ทั้งหมดของนักเรียนคนนี้ 
                        include: {
                            classroom: true, // 2. ในแต่ละการลงทะเบียน ให้ดึงข้อมูล Classroom มาด้วย 
                        },
                    },
                },
            });

            if (!studentWithClasses) {
                return res.status(404).json({ message: "ไม่พบห้องเรียน" });
            }
            return res.status(200).json(studentWithClasses);
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    },
}