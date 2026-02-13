using TaskManager.Api.Domain.Entities;

namespace TaskManager.Api.Application.Interfaces;

public interface ITaskRepository
{
    Task<List<TaskModel>> GetAllByUserIdAsync(long userId);
    Task<TaskModel?> GetByIdAsync(long id, long userId);
    Task<TaskModel> AddAsync(TaskModel task);
    Task UpdateAsync(TaskModel task);
    Task DeleteAsync(TaskModel task);
}
