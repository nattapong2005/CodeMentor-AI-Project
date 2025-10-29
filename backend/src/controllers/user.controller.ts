import type { Response, Request } from "express";
import prisma from "../database/db";

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
            const { id } = req.params;
            
            const user = await prisma.users.findUnique({
                where: { user_id: id as string },
            });
            if (!user) {
                return res.status(404).json({ message: "ไม่พบผู้ใช้" });
            }
            return res.status(200).json(user);
        } catch (err) {
            console.log(err)
        }
    }
}