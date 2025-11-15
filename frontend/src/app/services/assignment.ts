import Cookies from "js-cookie";
import { api } from "../utils/api";
export const getAssignment = async () => {
    try {
        const token = Cookies.get("auth_token");
        const { data } = await api.get("/assignments", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching assignments:", err);
        throw err;
    }
};