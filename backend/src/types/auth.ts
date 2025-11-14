import { Role } from "../generated/prisma";

export interface AuthUser {
  user_id: string;
  name: string;
  lastname: string;
  email: string;
  role: Role;
}
