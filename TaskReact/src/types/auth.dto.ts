import { z } from 'zod';

export const createUserSchema = z.object({
    name: z
        .string()
        .min(2, 'Nome deve ter no mínimo 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),
    email: z
        .email('Email inválido')
        .min(1, 'Email é obrigatório')
    ,
    password: z
        .string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres'),
});

export type CreateUserRequest = z.infer<typeof createUserSchema>;


export const loginSchema = z.object({
    email: z
        .email('Email inválido')
        .min(1, 'Email é obrigatório')
    ,
    password: z
        .string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(50, 'Senha deve ter no máximo 50 caracteres'),
});

export type LoginRequest = z.infer<typeof loginSchema>;




export interface UserResponse {
    id: number;
    name: string;
    email: string;
}

export interface AuthResponse {
    user: {
        id: number,
        name: string,
        email: string
    },
    token: string,
    expiresAt: Date
}