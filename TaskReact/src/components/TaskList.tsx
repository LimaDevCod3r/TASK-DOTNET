import { ClipboardList, Loader2 } from "lucide-react";
import { TaskCard } from "./TaskCard";
import type { Task, UpdateTaskRequest } from "../types/task.dto";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onUpdate: (id: string, data: UpdateTaskRequest) => Promise<void>;
  onDelete: (id: string) => void;
  updatingId: string | null;
}

/**
 * Componente de Lista de Tarefas.
 * Gerencia a exibição da coleção de tarefas e estados de feedback (loading/vazio).
 */
export const TaskList = ({
  tasks,
  loading,
  onToggleComplete,
  onUpdate,
  onDelete,
  updatingId,
}: TaskListProps) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3" aria-busy="true">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
        <p className="font-medium animate-pulse">Carregando suas tarefas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div
        className="bg-white rounded-3xl border-2 border-dashed border-gray-100 p-16 text-center"
        role="status"
      >
        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <ClipboardList className="w-10 h-10 text-gray-300" aria-hidden />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Tudo limpo por aqui!</h3>
        <p className="text-gray-500 max-w-xs mx-auto">
          Você não tem nenhuma tarefa pendente. Que tal começar criando uma agora mesmo?
        </p>
      </div>
    );
  }

  // Ordenação: Pendentes primeiro, depois as mais recentes
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.isCompleted !== b.isCompleted) {
      return a.isCompleted ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="space-y-4" aria-label="Lista de tarefas">
      <div className="flex items-center justify-between px-2">
        <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Sua Lista ({tasks.length})
        </h2>
      </div>
      
      <ul className="grid gap-4">
        {sortedTasks.map((task) => (
          <li key={task.id} className="list-none">
            <TaskCard
              task={task}
              onToggleComplete={onToggleComplete}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isUpdating={updatingId === task.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
