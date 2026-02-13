import { apiClient } from "../lib/api.client";
import type {
  Task,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "../types/task.dto";

const PATH = "/task";

export const taskService = {
  list: () => apiClient.get<Task[]>(PATH),
  create: (data: CreateTaskRequest) => apiClient.post<Task>(PATH, data),
  update: (id: string, data: UpdateTaskRequest) =>
    apiClient.patch<Task>(`${PATH}/${id}`, data),
  delete: (id: string) => apiClient.delete(`${PATH}/${id}`),
};
