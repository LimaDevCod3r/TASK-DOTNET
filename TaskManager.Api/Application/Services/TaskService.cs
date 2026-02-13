using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Application.Interfaces;
using TaskManager.Api.Application.Mappers;
using TaskManager.Api.Domain.Exceptions;

namespace TaskManager.Api.Application.Services;

public class TaskService : ITaskService
{
    private readonly ITaskRepository _repository;

    public TaskService(ITaskRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<TaskResponseDto>> GetAllByUserIdAsync(long userId)
    {
        var tasks = await _repository.GetAllByUserIdAsync(userId);
        return tasks.Select(TaskMapper.ToResponseDto).ToList();
    }

    public async Task<TaskResponseDto> GetByIdAsync(long id, long userId)
    {
        var task = await _repository.GetByIdAsync(id, userId)
            ?? throw new NotFoundException($"Task com id {id} não foi encontrada.", 404);
        return TaskMapper.ToResponseDto(task);
    }

    public async Task<TaskResponseDto> AddTaskAsync(long userId, CreateTaskRequestDto dto)
    {
        var task = TaskMapper.ToEntity(dto, userId);
        var created = await _repository.AddAsync(task);
        return TaskMapper.ToResponseDto(created);
    }

    public async Task<TaskResponseDto> UpdateTaskAsync(long id, long userId, UpdateTaskRequestDto dto)
    {
        var task = await _repository.GetByIdAsync(id, userId)
            ?? throw new NotFoundException($"Task com id {id} não foi encontrada.", 404);

        TaskMapper.UpdateEntity(task, dto);
        await _repository.UpdateAsync(task);

        return TaskMapper.ToResponseDto(task);
    }

    public async Task DeleteTaskAsync(long id, long userId)
    {
        var task = await _repository.GetByIdAsync(id, userId)
            ?? throw new NotFoundException($"Task com id {id} não foi encontrada.", 404);
        await _repository.DeleteAsync(task);
    }
}
