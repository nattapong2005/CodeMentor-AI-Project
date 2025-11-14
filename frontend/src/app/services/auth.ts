import { LoginRequest, LoginResponse } from "../types/auth";

const API_URL = "http://localhost:9999/api";

export async function login(request: LoginRequest): Promise<LoginResponse> {
    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            credentials: "include",
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
export async function logout() {
    try {
        const res = await fetch(`${API_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        })
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
    }catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getMe() {
    try {
        const res = await fetch(`${API_URL}/users/me`, {
            method: "GET",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.message);
        }
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}