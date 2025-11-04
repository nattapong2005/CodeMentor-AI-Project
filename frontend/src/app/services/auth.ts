import { LoginRequest, LoginResponse } from "../types/auth";

const API_URL = "http://localhost:9999/api";

export async function login(request: LoginRequest): Promise<LoginResponse> {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(request),
        });
        const data: LoginResponse = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}
