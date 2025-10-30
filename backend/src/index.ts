import express from 'express';
import cors from 'cors';
import { Request, Response } from 'express';
import chalk from 'chalk';
import dotenv from 'dotenv';
import { promises as fs } from 'fs';
import path from 'path';
import prisma from './database/db';
import { loginRoute } from './routes/login.route';
import { userRoute } from './routes/user.route';
import { assignmentRoute } from './routes/assignment.route';
import { classroomRoute } from './routes/classroom.route';
import { submissionRoute } from './routes/submission.route';

dotenv.config();
const port = process.env.PORT || 1337;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Hello API!" });
});


// Test route
// -------------------------------------------------------------------------
app.get("/users", async (req: Request, res: Response) => {
    const user = await prisma.users.findMany();
    res.json(user);
});

app.get("/classrooms", async (req: Request, res: Response) => {
    const classroom = await prisma.classroom.findMany({
        include: {
            teacher: true
        }
    });
    res.json(classroom);
});

app.get("/enrollments", async (req: Request, res: Response) => {
    const enrollment = await prisma.enrollment.findMany();
    res.json(enrollment);
});


app.get("/assignments", async (req: Request, res: Response) => {
    const assignments = await prisma.assignment.findMany();
    res.json(assignments);
});

app.get("/submissions", async (req: Request, res: Response) => {
    const submissions = await prisma.submission.findMany({
        include: {
            student: true
        }
    });
    res.json(submissions);
});

// -------------------------------------------------------------------------


app.get("/test-file/:user_id", async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const uploads = path.join(process.cwd(), '/src/uploads');
    const filePath = path.join(uploads, user_id as string);

    if (!user_id || typeof user_id !== 'string') {
        return res.status(404).json({ message: "Missing or invaild id!" });
    }

    if (!filePath.startsWith(uploads)) {
        return res.status(404).json({ message: "File not found!" });
    }
    try {
        await fs.access(filePath);
        const code = await fs.readFile(filePath, 'utf-8');
        res.status(200).json({ code: code });
    } catch (err) {
        res.status(500).json({ error: 'Error reading file' });
        console.log(err)
    }

});

app.use("/api/login", loginRoute);
app.use("/api/users", userRoute);
app.use("/api/assignments", assignmentRoute);
app.use("/api/classrooms", classroomRoute);
app.use("/api/submissions", submissionRoute);


app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "ไม่พบเส้นทางที่เรียกใช้" });
});


const online = `
╔═╗╔═╗╦  ╦╔═╗  ╔═╗╔╗╔╦  ╦╔╗╔╔═╗
╠═╣╠═╝║  ║╚═╗  ║ ║║║║║  ║║║║║╣ 
╩ ╩╩  ╩  ╩╚═╝  ╚═╝╝╚╝╩═╝╩╝╚╝╚═╝
`;
app.listen(port, () => {
    console.log(chalk.cyanBright(online));
    console.log(chalk.greenBright(`API is running on http://localhost:${port}`));
});

