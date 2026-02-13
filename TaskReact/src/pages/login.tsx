import { ClipboardCheck } from "lucide-react";
import { useAuthenticate } from "../hooks/useAuthenticate";
import type { LoginRequest } from "../types/auth.dto";

export function LoginPage() {
  const { login, isLoading, error, fieldErrors } = useAuthenticate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const payload = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const auth = await login(payload);

    if (auth) {
      console.log("Usuário autenticado", auth);
    }
  };

  const getFieldError = (field: keyof LoginRequest) =>
    fieldErrors.find((e) => e.field === field)?.message;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      {/* Card */}
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        {/* Ícone */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <ClipboardCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Titulo */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Fazer Login
        </h2>

        {/* Erro global da API */}
        {error && (
          <div
            className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Formulário */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              aria-label="Email"
              aria-invalid={!!getFieldError("email")}
              aria-describedby={
                getFieldError("email") ? "email-error" : undefined
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {getFieldError("email") && (
              <span id="email-error" className="text-red-500 text-sm mt-1">
                {getFieldError("email")}
              </span>
            )}
          </div>

          {/* Senha */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              type="password"
              name="password"
              aria-label="Senha"
              placeholder="********"
              aria-invalid={!!getFieldError("password")}
              aria-describedby={
                getFieldError("password") ? "password-error" : undefined
              }
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            {getFieldError("password") && (
              <span id="password-error" className="text-red-500 text-sm mt-1">
                {getFieldError("password")}
              </span>
            )}
          </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
