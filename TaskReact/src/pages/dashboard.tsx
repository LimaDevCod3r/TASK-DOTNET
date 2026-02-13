import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import { 
  ClipboardCheck, 
  LogOut, 
  Search,
  CheckCircle2,
  Circle
} from "lucide-react";
import { removeToken } from "../lib/auth.storage";
import { useTasks } from "../hooks/useTasks";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import type { UpdateTaskRequest } from "../types/task.dto";

/**
 * Página de Dashboard Principal.
 * Orquestra a lógica de busca, filtros e ações globais.
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks();

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");
  const [isCreating, setIsCreating] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Logout do sistema
  const handleLogout = () => {
    removeToken();
    navigate("/login", { replace: true });
  };

  // Filtragem e Busca em memória para melhor UX
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = 
        filter === "all" || 
        (filter === "pending" && !task.isCompleted) || 
        (filter === "completed" && task.isCompleted);

      return matchesSearch && matchesFilter;
    });
  }, [tasks, searchTerm, filter]);

  const handleCreateTask = async (data: {
    title: string;
    description: string;
    isCompleted?: boolean;
  }) => {
    setIsCreating(true);
    try {
      await createTask(data);
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateTask = async (id: string, data: UpdateTaskRequest) => {
    setUpdatingId(id);
    try {
      await updateTask(id, data);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleToggleComplete = async (id: string, isCompleted: boolean) => {
    handleUpdateTask(id, { isCompleted });
  };

  const handleDelete = async (id: string) => {
    setUpdatingId(id);
    try {
      await deleteTask(id);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header Moderno */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-xl shadow-lg shadow-blue-200">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black text-gray-900 leading-none">TASK.NET</h1>
              <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mt-1">Dashboard</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-10">
        {/* Seção de Erro */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium animate-in fade-in slide-in-from-top-2">
            Ops! Algo deu errado: {error}
          </div>
        )}

        {/* Barra de Ferramentas: Busca e Filtros */}
        <section className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar tarefas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white border border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all text-gray-700 font-medium"
              />
            </div>
            
            <div className="flex bg-white p-1 rounded-2xl border border-gray-100 shadow-sm">
              <button
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  filter === "all" ? "bg-gray-900 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  filter === "pending" ? "bg-blue-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <Circle className="w-3 h-3" />
                Pendentes
              </button>
              <button
                onClick={() => setFilter("completed")}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  filter === "completed" ? "bg-green-600 text-white shadow-md" : "text-gray-500 hover:bg-gray-50"
                }`}
              >
                <CheckCircle2 className="w-3 h-3" />
                Concluídas
              </button>
            </div>
          </div>

          {/* Formulário de Criação */}
          <TaskForm onSubmit={handleCreateTask} isLoading={isCreating} />
        </section>

        {/* Lista de Tarefas */}
        <section>
          <TaskList
            tasks={filteredTasks}
            loading={loading}
            onToggleComplete={handleToggleComplete}
            onUpdate={handleUpdateTask}
            onDelete={handleDelete}
            updatingId={updatingId}
          />
        </section>
      </main>

      {/* Footer Decorativo */}
      <footer className="py-10 text-center">
        <p className="text-xs font-bold text-gray-300 uppercase tracking-[0.2em]">
          Foco e Produtividade • 2026
        </p>
      </footer>
    </div>
  );
}
