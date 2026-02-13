import { useCallback, useState } from "react"
import { authService } from "../services/auth.service";
import { createUserSchema, type CreateUserRequest } from "../types/auth.dto";
import { isAxiosError } from "axios";
import { useNavigate } from "react-router";

type ValidationError = {
    field: keyof CreateUserRequest;
    message: string;
};


export const useRegister = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [fieldErrors, setFieldErrors] = useState<ValidationError[]>([]);
    const navigate = useNavigate();

    const register = useCallback(async (data: CreateUserRequest) => {
        setError(null);
        setFieldErrors([]);

        const result = createUserSchema.safeParse(data);

        if (!result.success) {
            const errors: ValidationError[] = result.error.issues.map((err) => ({
                field: err.path[0] as keyof CreateUserRequest,
                message: err.message,
            }));
            setFieldErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const { data: user } = await authService.register(result.data);
            setIsSuccess(true);
            await new Promise((resolve) => setTimeout(resolve, 1500)); // 1.5s
            navigate('/login');;
            return user;
        } catch (err) {
            const message = isAxiosError(err) ? (err.response?.data?.message ?? err.message ?? 'Erro ao cadastrar')
                : err instanceof Error ? err.message : 'Error ao cadastrar'
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    return { register, isLoading, isSuccess, error, fieldErrors };
};