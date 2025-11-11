import { api } from "../services/api";
import Cookies from "js-cookie";
export const getAssignment = async () => {
    try {
        const token = Cookies.get("auth_token");
        const res = await api.get("/assignments", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error("Error fetching assignments:", err);
        throw err;
    }
};
