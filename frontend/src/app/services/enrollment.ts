import { api } from "../utils/api";

export const getMyEnrollment = async () => {
    try {
        const { data } = await api.get("/enrollments/my", {
            withCredentials: true,
        });
        return data;
    } catch (err) {
        console.error("Error fetching enrollments:", err);
        throw err;
    }
};