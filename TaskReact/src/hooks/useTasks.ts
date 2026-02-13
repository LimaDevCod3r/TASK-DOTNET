import { useCallback, useEffect, useState } from "react";
import { taskService } from "../services/task.service";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../types/task.dto";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await taskService.list();
      setTasks(data ?? []);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao carregar tarefas";
      setError(message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const createTask = useCallback(
    async (payload: CreateTaskRequest) => {
      setError(null);
      try {
        const { data } = await taskService.create(payload);
        setTasks((prev) => [data, ...prev]);
        return data;
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Erro ao criar tarefa";
        setError(message);
        throw err;
      }
    },
    []
  );

  const updateTask = useCallback(
    async (id: string, payload: UpdateTaskRequest) => {
      setError(null);
      try {
        const { data } = await taskService.update(id, payload);
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? data : t))
        );
        return data;
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Erro ao atualizar tarefa";
        setError(message);
        throw err;
      }
    },
    []
  );

  const deleteTask = useCallback(async (id: string) => {
    setError(null);
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Erro ao excluir tarefa";
      setError(message);
      throw err;
    }
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  };
};
