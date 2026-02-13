import { ClipboardCheck } from "lucide-react";
import type { CreateUserRequest } from "../types/auth.dto";
import { useRegister } from "../hooks/useRegister";

export default function RegisterPage() {
  const { register, isLoading, isSuccess, error, fieldErrors } = useRegister();

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };
    const user = await register(payload);
    if (user) {
        console.log('Cadastrado com sucesso', user);
      }
  };

  const getFieldError = (field: keyof CreateUserRequest) =>
    fieldErrors.find((e) => e.field === field)?.message;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <ClipboardCheck className="w-6 h-6" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Criar a conta
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

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome"
              autoComplete="name"
              aria-label="Nome"
              aria-invalid={!!getFieldError('name')}
              aria-describedby={getFieldError('name') ? 'name-error' : undefined}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition aria-invalid:border-red-500"
            />
            {getFieldError('name') && (
              <span id="name-error" className="text-red-500 text-sm mt-1">
                {getFieldError('name')}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              autoComplete="email"
              aria-label="Email"
              aria-invalid={!!getFieldError('email')}
              aria-describedby={getFieldError('email') ? 'email-error' : undefined}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition aria-invalid:border-red-500"
            />
            {getFieldError('email') && (
              <span id="email-error" className="text-red-500 text-sm mt-1">
                {getFieldError('email')}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              autoComplete="new-password"
              aria-label="Senha"
              aria-invalid={!!getFieldError('password')}
              aria-describedby={getFieldError('password') ? 'password-error' : undefined}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition aria-invalid:border-red-500"
            />
            {getFieldError('password') && (
              <span id="password-error" className="text-red-500 text-sm mt-1">
                {getFieldError('password')}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSuccess ? 'Redirecionando...' : isLoading ? 'Cadastrando...' : 'Criar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
}