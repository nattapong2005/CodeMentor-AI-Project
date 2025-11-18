import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AuthUser } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET || "uasdup4o54390853409589403!@$@%$%XDSdsfdf";

export interface AuthRequest extends Request {
  user?: AuthUser;
}
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies?.auth_token;
    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
      }
    }
    if (!token) {
      return res.status(401).json({ message: "ไม่พบ Token ที่ส่งมา" });
    }
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded) {
      return res.status(401).json({ message: "Token ไม่ถูกต้อง" });
    }
    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
      name: decoded.name,
      lastname: decoded.lastname,
      role: decoded.role
    };
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Token ไม่ถูกต้องหรือหมดอายุ" });
  }
};
