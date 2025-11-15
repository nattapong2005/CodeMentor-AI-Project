import { api } from "../utils/api";
import Cookies from "js-cookie";

export const getClassroom = async () => {
    try {
        const token = Cookies.get("auth_token");
        const { data } = await api.get("/classrooms", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching classrooms:", err);
        throw err;
    }
};