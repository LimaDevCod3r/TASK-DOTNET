using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;

namespace TaskManager.Api.Application.Interfaces;

public interface ITaskService
{
    Task<List<TaskResponseDto>> GetAllByUserIdAsync(long userId);
    Task<TaskResponseDto> GetByIdAsync(long id, long userId);
    Task<TaskResponseDto> AddTaskAsync(long userId, CreateTaskRequestDto dto);
    Task<TaskResponseDto> UpdateTaskAsync(long id, long userId, UpdateTaskRequestDto dto);
    Task DeleteTaskAsync(long id, long userId);
}
