import { api } from "../services/api";
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from "../types/auth";

export const getEnrollmentById = async (): Promise<any> => {
    try {
        const token = Cookies.get("auth_token");

        if (!token) throw new Error("ไม่พบ Token ที่ส่งมา");

        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        const user_id = decoded.user_id;

        if (!user_id) throw new Error("ไม่พบ user_id ของผู้ใช้");

        const res = await api.get("/enrollments/", {
            params: {
                user_id: user_id,
            },
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching enrollments:", err);
        throw err;
    }
};