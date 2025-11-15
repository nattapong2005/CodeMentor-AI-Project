import Cookies from "js-cookie";
import { api } from "../utils/api";
export const getUser = async () => {
    try {
        const token = Cookies.get("auth_token");
        const { data } = await api.get("/users", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching user:", err);
        throw err;
    }
};

export const getMe = async () => {
    try {
        const token = Cookies.get("auth_token");
        const { data } = await api.get("/users/me", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return data;
    } catch (err) {
        console.error("Error fetching me:", err);
        throw err;
    }
}