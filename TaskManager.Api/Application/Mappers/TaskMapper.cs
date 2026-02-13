using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Domain.Entities;

namespace TaskManager.Api.Application.Mappers;

public static class TaskMapper
{
    public static TaskResponseDto ToResponseDto(TaskModel model)
    {
        return new TaskResponseDto
        {
            Id = model.Id,
            Title = model.Title,
            Description = model.Description,
            IsCompleted = model.IsCompleted,
            CreatedAt = model.CreatedAt,
            
        };
    }

    public static TaskModel ToEntity(CreateTaskRequestDto dto, long userId)
    {
        return new TaskModel
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = false,
            UserId = userId
        };
    }

    public static void UpdateEntity(TaskModel entity, UpdateTaskRequestDto dto)
    {
        if (dto.Title is not null)
            entity.Title = dto.Title;

        if (dto.Description is not null)
            entity.Description = dto.Description;

        if (dto.IsCompleted.HasValue)
            entity.IsCompleted = dto.IsCompleted.Value;
    }
}
