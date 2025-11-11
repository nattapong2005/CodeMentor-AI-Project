import { api } from "../services/api";
import Cookies from "js-cookie";
export const getClassroom = async () => {
    try {
        const token = Cookies.get("auth_token");
        const res = await api.get("/classrooms", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching classrooms:", err);
        throw err;
    }
};
