// import dotenv from 'dotenv';
import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import chalk from 'chalk';
import { promises as fs } from 'fs';
import path from 'path';
import { authRoute } from './routes/auth.route';
import { userRoute } from './routes/user.route';
import { assignmentRoute } from './routes/assignment.route';
import { classroomRoute } from './routes/classroom.route';
import { submissionRoute } from './routes/submission.route';
import { authMiddleware } from './middlewares/auth';
import { enrollRoute } from './routes/entrollment.route';


const port = process.env.PORT || 1337;
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", async (req: Request, res: Response) => {
    res.json({ message: "Hello API!" });
});


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

app.use("/api/auth", authRoute);
app.use("/api/me", authMiddleware, authRoute);
app.use("/api/users", authMiddleware, userRoute);
app.use("/api/assignments", authMiddleware, assignmentRoute);
app.use("/api/classrooms", authMiddleware, classroomRoute);
app.use("/api/submissions", authMiddleware, submissionRoute);
app.use("/api/enrollments", enrollRoute);


app.get("/c", (req: Request, res: Response) => {
    console.log("Cookies from client:", req.headers.cookie);
    res.json({ cookies: req.headers.cookie });
});

app.use((req: Request, res: Response) => {
    res.status(404).json({ message: "ไม่พบเส้นทางที่เรียกใช้" });
});


// async function main() {
//   try {
//     await prisma.$connect();
//     console.log('✅ Database connected successfully!');
//   } catch (error) {
//     console.error('❌ Database connection failed:', error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }
// main();

const online = `
╔═╗╔═╗╦  ╦╔═╗  ╔═╗╔╗╔╦  ╦╔╗╔╔═╗
╠═╣╠═╝║  ║╚═╗  ║ ║║║║║  ║║║║║╣ 
╩ ╩╩  ╩  ╩╚═╝  ╚═╝╝╚╝╩═╝╩╝╚╝╚═╝

`;
app.listen(port, () => {
    console.log(chalk.cyanBright(online));
    console.log(chalk.greenBright(`API is running on http://localhost:${port}`));
});

