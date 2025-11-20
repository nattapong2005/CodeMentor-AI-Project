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

export const getAssignmentByClassId = async (assignment_id: string) => {
    try {
        const token = Cookies.get("auth_token");
        const { data } = await api.get(`/assignments/a/${assignment_id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching assignment:", err);
        throw err;
    }
};

export const getAssignmentInClassId = async (class_id: string) => {
    try {
        const token = Cookies.get("auth_token");
        const { data } = await api.get(`/assignments/${class_id}`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching assignment:", err);
        throw err;
    }
};  