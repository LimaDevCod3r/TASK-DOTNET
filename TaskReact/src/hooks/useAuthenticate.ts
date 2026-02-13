import { useCallback, useState } from "react";
import { loginSchema, type LoginRequest } from "../types/auth.dto";
import { authService } from "../services/auth.service";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router";
import { setToken } from "../lib/auth.storage";


type ValidationError = {
    field: keyof LoginRequest;
    message: string;
};


export const useAuthenticate = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<ValidationError[]>([]);


    const navigate = useNavigate();
    const location = useLocation();

    const login = useCallback(async (data: LoginRequest) => {
        setError(null)
        setFieldErrors([])

        const result = loginSchema.safeParse(data);

        if (!result.success) {
            const errors: ValidationError[] = result.error.issues.map((err) => ({
                field: err.path[0] as keyof LoginRequest,
                message: err.message,
            }));
            setFieldErrors(errors);
            return;
        }

        setIsLoading(true);
        try {
            const { data: auth } = await authService.Login(result.data);
            if (auth?.token) {
                setToken(auth.token);
                const from = (location.state as { from?: { pathname: string } })?.from?.pathname ?? '/dashboard';
                navigate(from, { replace: true });
            }
            
            return auth
        } catch (err) {
            const message = isAxiosError(err) ? (err.response?.data?.message ?? err.message ?? 'Erro ao cadastrar')
                : err instanceof Error ? err.message : 'Error ao autenticar'
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, [navigate,location])

    return { login, isLoading, error, fieldErrors };
}