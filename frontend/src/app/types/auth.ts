export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: {
        user_id: number;
        name: string;
        email: string;
    };
    message?: string
}