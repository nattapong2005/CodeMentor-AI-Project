import type { Response, Request } from "express";
import prisma from "../database/db";

export const enrollController = {
    getEnrollment: async (req: Request, res: Response) => {
        try {
            const enrollment = await prisma.enrollment.findMany();
            if (!enrollment) {
                return res.status(404).json({ message: "ไม่พบการลงทะเบียน" });
            }
            return res.status(200).json(enrollment);
        } catch (err) {
            console.log(err)
        }
    }
}