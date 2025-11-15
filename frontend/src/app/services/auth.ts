import { api } from "../utils/api";
import { LoginRequest, LoginResponse } from "../types/auth";

export const login = async ({ email, password }: LoginRequest): Promise<LoginResponse> => {
    try {
        const { data } = await api.post<LoginResponse>(
            "/auth/login",
            { email, password },
            { withCredentials: true }
        );
        return data;
    } catch (err: any) {
        // console.error(err);
        throw new Error(err.response?.data?.message || err.message);
    }
};
export const logout = async (): Promise<any> => {
    try {
        const { data } = await api.post(
            "/auth/logout",
            {},
            { withCredentials: true }
        );
        return data;
    } catch (err) {
        // console.error("Logout error:", err);
        throw new Error('Logout failed');
    }
};