import type { Response, Request } from "express";
import prisma from "../database/db";
import { get } from "http";
import { createSubmissionSchema, updateSubmissionSchema } from "../types/submission";

export const submissionController = {
    getAllSubmission: async (req: Request, res: Response) => {
        try {
            const submission = await prisma.submission.findMany();
            if (!submission) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json(submission);
        } catch (err) {
            console.log(err)
        }
    },
    getSubmissionById: async (req: Request, res: Response) => {
        try {
            const { submission_id } = req.params;
            const submission = await prisma.submission.findUnique({
                where: { submission_id: submission_id as string },
            });
            if (!submission) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json(submission);
        } catch (err) {
            console.log(err)
        }
    },
    createSubmission: async (req: Request, res: Response) => {
        try {
            const result = createSubmissionSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
            }
            const { code, submitted_at, status, score, ai_feedback, teacher_feedback, assignment_id, student_id } = result.data;
            const submission = await prisma.submission.create({
                data: {
                    code,
                    submitted_at,
                    status,
                    score,
                    ai_feedback,
                    teacher_feedback,
                    assignment_id,
                    student_id
                },
            });
            if (!submission) {
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในการสร้างการส่งงาน" });
            }
            return res.status(201).json({ message: "สร้างการส่งงานสําเร็จ", submission });

        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    },
    updateSubmission: async (req: Request, res: Response) => {
        try {
            const result = updateSubmissionSchema.safeParse(req.body);
            const { submission_id } = req.params;
            if (!submission_id) {
                return res.status(400).json({ message: "กรุณาระบุ submission_id" });
            }
            if (!result.success) {
                return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
            }
            const { code, submitted_at, status, score, ai_feedback, teacher_feedback, assignment_id, student_id } = result.data;
            const submission = await prisma.submission.update({
                where: { submission_id: submission_id as string },
                data: {
                    code,
                    submitted_at,
                    status,
                    score,
                    ai_feedback,
                    teacher_feedback,
                    assignment_id,
                    student_id
                },
            });
            if (!submission) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json({ message: "อัพเดตการส่งงานสําเร็จ", submission });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    },
    deleteSubmission: async (req: Request, res: Response) => {
        try {
            const { submission_id } = req.params;
            const submission = await prisma.submission.delete({
                where: { submission_id: submission_id as string },
            });
            if (!submission) {
                return res.status(404).json({ message: "ไม่พบการส่งงาน" });
            }
            return res.status(200).json({ message: "ลบการส่งงานสําเร็จ" });
        } catch (err) {
            console.log(err)
            return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
        }
    }
};