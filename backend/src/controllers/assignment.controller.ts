import type { Response, Request } from "express";
import prisma from "../database/db";
import { createAssignmentSchema, updateAssignmentSchema } from "../types/assignment";

export const assignmentController = {
    getAssignment: async (req: Request, res: Response) => {
        try {
            const assignment = await prisma.assignment.findMany();
            if (!assignment) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json(assignment);
        } catch (err) {
            console.log(err)
        }
    },
    getAssignmentById: async (req: Request, res: Response) => {
        try {
            const { assignment_id } = req.params;
            const assignment = await prisma.assignment.findUnique({
                where: { assignment_id: assignment_id as string },
            });
            if (!assignment) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json(assignment);
        } catch (err) {
            console.log(err)
        }
    },
    getAssignmentByClassId: async (req: Request, res: Response) => {
        try {
            const { class_id } = req.params;
            
            const assignment = await prisma.assignment.findMany({
                where: { class_id: class_id as string },
            });
            
            if (!assignment) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json(assignment);
        } catch (err) {
            console.log(err)
        } 
    },
    createAssignment: async (req: Request, res: Response) => {
        try {
            const result = createAssignmentSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
            }
            const { title, description, feedback_level, due_date, class_id } = result.data;
            const assignment = await prisma.assignment.create({
                data: {
                    title,
                    description,
                    feedback_level,
                    due_date: new Date(due_date),
                    class_id
                },
            });
            if (!assignment) {
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในการสร้างการส่งงาน" });
            }
            return res.status(201).json({ message: "สร้างการส่งงานสําเร็จ", assignment });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    },
    updateAssignment: async (req: Request, res: Response) => {
        try {
            const result = updateAssignmentSchema.safeParse(req.body);
            const { assignment_id } = req.params;
            if (!assignment_id) {
                return res.status(400).json({ message: "กรุณาระบุ assignment_id" });
            }
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
            }
            const { title, description, due_date, class_id } = result.data;
            const assignment = await prisma.assignment.update({
                where: { assignment_id: assignment_id as string },
                data: {
                    title,
                    description,
                    due_date: new Date(due_date),
                    class_id
                },
            });
            if (!assignment) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json({ message: "อัพเดตการส่งงานสําเร็จ", assignment });
        } catch (err) {
            console.log(err)
        }
    },
    deleteAssignment: async (req: Request, res: Response) => {
        try {
            const { assignment_id } = req.params;
            if (!assignment_id) {
                return res.status(400).json({ message: "กรุณาระบุ assignment_id" });
            }
            const assignment = await prisma.assignment.delete({
                where: { assignment_id: assignment_id as string },
            });
            if (!assignment) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json({ message: "ลบการส่งงานสําเร็จ" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    },
};  