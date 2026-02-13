import { apiClient } from "../lib/api.client";
import type { AuthResponse, CreateUserRequest, LoginRequest, UserResponse } from '../types/auth.dto'


export const authService = {
    register: (data: CreateUserRequest) =>
        apiClient.post<UserResponse>('/user/register', data),

    Login: (data: LoginRequest) =>
        apiClient.post<AuthResponse>('/auth/login',data)
    
}