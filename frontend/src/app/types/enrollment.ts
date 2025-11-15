import { Classroom } from "./classroom";

export interface Enrollment {
  enrollment_id: string;
  joined_at: string; 
  class_id: string;
  student_id: string;
  classroom: Classroom;
}