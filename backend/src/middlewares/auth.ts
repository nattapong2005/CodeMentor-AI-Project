import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fghfKDSJJfgrk#U$Y#@#($($4564553485734A";

export interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (req: AuthRequest,res: Response,next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "ไม่พบ Token ที่ส่งมา" });
  }

  const token = authHeader.split(" ")[1];

  if(!token) {
    return res.status(401).json({ message: "ไม่พบ Token ที่ส่งมา" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).json({ message: "Token ไม่ถูกต้องหรือหมดอายุ" });
  }
};
