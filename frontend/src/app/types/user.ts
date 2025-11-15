import { Enrollment } from "./enrollment";

export interface User {
  user_id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  role: "STUDENT" | "TEACHER" | "ADMIN" | string; 
  enrollments: Enrollment[];
}