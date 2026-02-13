import { useState } from "react";
import { Plus, ChevronUp, LayoutList } from "lucide-react";
import type { CreateTaskRequest } from "../types/task.dto";

interface TaskFormProps {
  onSubmit: (data: CreateTaskRequest) => Promise<void>;
  isLoading?: boolean;
}

/**
 * Componente para criação de tarefas.
 * Possui design expansível para manter a UI limpa quando não estiver em uso.
 */
export const TaskForm = ({ onSubmit, isLoading = false }: TaskFormProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await onSubmit({ 
        title: title.trim(), 
        description: description.trim(),
        isCompleted: false 
      });
      setTitle("");
      setDescription("");
      setIsExpanded(false);
    } catch (error) {
      console.error("Falha ao criar tarefa:", error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300">
      {/* Gatilho de Expansão (quando colapsado) */}
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="w-full px-6 py-4 flex items-center justify-between text-gray-500 hover:bg-gray-50 transition-colors group"
        >
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Plus className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium">Adicionar nova tarefa...</span>
          </div>
          <LayoutList className="w-5 h-5 opacity-30" />
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
              Nova Tarefa
            </h2>
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronUp className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="task-title" className="text-xs font-bold text-gray-700 mb-1 ml-1">
                O que precisa ser feito?
              </label>
              <input
                id="task-title"
                type="text"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Finalizar relatório mensal"
                className="w-full border-none bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="task-description" className="text-xs font-bold text-gray-700 mb-1 ml-1">
                Mais detalhes 
              </label>
              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Adicione notas ou subtarefas..."
                className="w-full border-none bg-gray-50 rounded-xl px-4 py-3 text-gray-800 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all min-h-[100px] resize-none"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-700 transition-colors"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading || !title.trim()}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100 flex items-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Plus className="w-4 h-4" />
              )}
              Criar Tarefa
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
