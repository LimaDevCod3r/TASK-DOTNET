import { CheckSquare, Square, Trash2, Pencil, Calendar } from "lucide-react";
import { useState } from "react";
import type { Task, UpdateTaskRequest } from "../types/task.dto";
import { TaskEditModal } from "./TaskEditModal";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string, isCompleted: boolean) => void;
  onUpdate: (id: string, data: UpdateTaskRequest) => Promise<void>;
  onDelete: (id: string) => void;
  isUpdating?: boolean;
}


export const TaskCard = ({
  task,
  onToggleComplete,
  onUpdate,
  onDelete,
  isUpdating = false,
}: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleToggle = () => {
    onToggleComplete(task.id, !task.isCompleted);
  };

  const handleDelete = () => {
    onDelete(task.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <article
        className={`group bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 p-5 transition-all duration-300 ${
          task.isCompleted ? "bg-gray-50/50" : "bg-white"
        }`}
        aria-label={`Tarefa: ${task.title}`}
      >
        <div className="flex items-start gap-4">
          {/* Checkbox Customizado */}
          <button
            type="button"
            onClick={handleToggle}
            disabled={isUpdating}
            className={`shrink-0 mt-1 transition-transform active:scale-90 ${
              task.isCompleted ? "text-green-500" : "text-gray-300 hover:text-blue-500"
            }`}
            aria-label={task.isCompleted ? "Desmarcar como concluída" : "Marcar como concluída"}
          >
            {task.isCompleted ? (
              <CheckSquare className="w-6 h-6 fill-green-50" />
            ) : (
              <Square className="w-6 h-6" />
            )}
          </button>

          {/* Conteúdo da Tarefa */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-bold text-gray-800 leading-tight wrap-break-word ${
                task.isCompleted ? "line-through text-gray-400 font-medium" : ""
              }`}
            >
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`mt-2 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap ${
                task.isCompleted ? "text-gray-400" : ""
              }`}>
                {task.description}
              </p>
            )}

            {/* Metadados */}
            <div className="mt-4 flex items-center gap-4 text-[11px] font-medium uppercase tracking-wider text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(task.createdAt)}
              </span>
              {task.isCompleted && (
                <span className="bg-green-100 text-green-600 px-2 py-0.5 rounded-full text-[10px]">
                  Concluída
                </span>
              )}
            </div>
          </div>

          {/* Ações Rápidas */}
          <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
              aria-label="Editar tarefa"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
              aria-label="Excluir tarefa"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </article>

      {/* Modal de Edição */}
      <TaskEditModal
        key={task.id}
        task={task}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={onUpdate}
        isLoading={isUpdating}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title={task.title}
        isLoading={isUpdating}
      />
    </>
  );
};
