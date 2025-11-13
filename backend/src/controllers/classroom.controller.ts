    import type { Response, Request } from "express";
    import prisma from "../database/db";
    import { createClassroomSchema } from "../types/classroom";

    export const classroomController = {
        getAllClassroom: async (req: Request, res: Response) => {
            try {
                const classroom = await prisma.classroom.findMany();
                if (!classroom) {
                    return res.status(404).json({ message: "ไม่พบห้องเรียน" });
                }
                return res.status(200).json(classroom);
            } catch (err) {
                console.log(err)
            }
        },
        getClassroomById: async (req: Request, res: Response) => {
            try {
                const { class_id } = req.params;
                const classroom = await prisma.classroom.findUnique({
                    where: { class_id: class_id as string },
                });
                if (!classroom) {
                    return res.status(404).json({ message: "ไม่พบห้องเรียน" });
                }
                return res.status(200).json(classroom);
            } catch (err) {
                console.log(err)
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
            }
        },
        createClassroom: async (req: Request, res: Response) => {
            try {
                const result = createClassroomSchema.safeParse(req.body);
                if (!result.success) {
                    return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
                }
                const { class_name, description, teacher_id } = result.data;
                const classroom = await prisma.classroom.create({
                    data: {
                        class_name,
                        description,
                        teacher_id
                    },
                });
                if (!classroom) {
                    return res.status(500).json({ message: "เกิดข้อผิดพลาดในการสร้างห้องเรียน" });
                }
                return res.status(201).json({ message: "สร้างห้องเรียนสําเร็จ", classroom });
            } catch (err) {
                console.log(err)
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
            }
        },
        updateClassroom: async (req: Request, res: Response) => {
            try {
                const result = createClassroomSchema.safeParse(req.body);
                const { class_id } = req.params;
                if (!class_id) {
                    return res.status(400).json({ message: "กรุณาระบุ class_id" });
                }
                if (!result.success) {
                    return res.status(400).json({ message: "กรุณาตรวจสอบข้อมูลให้ถูกต้อง", errors: result.error.flatten().fieldErrors, });
                }
                const { class_name, description, teacher_id } = result.data;
                const classroom = await prisma.classroom.update({
                    where: { class_id: class_id as string },
                    data: {
                        class_name,
                        description,
                        teacher_id
                    },
                });
                if (!classroom) {
                    return res.status(404).json({ message: "ไม่พบห้องเรียน" });
                }
                return res.status(200).json({ message: "อัพเดตห้องเรียนสําเร็จ", classroom });
            } catch (err) {
                console.log(err)
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
            }
        },
        deleteClassroom: async (req: Request, res: Response) => {
            try {
                const { class_id } = req.params;
                const classroom = await prisma.classroom.delete({
                    where: { class_id: class_id as string },
                });
                if (!classroom) {
                    return res.status(404).json({ message: "ไม่พบห้องเรียน" });
                }
                return res.status(200).json({ message: "ลบห้องเรียนสําเร็จ" });
            } catch (err) {
                console.log(err)
                return res.status(500).json({ message: "เกิดข้อผิดพลาดในเซิฟเวอร์" });
            }
        },
        getEnrollment: async (req: Request, res: Response) => {
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