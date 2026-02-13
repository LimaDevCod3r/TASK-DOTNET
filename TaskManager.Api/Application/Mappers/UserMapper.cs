using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Domain.Entities;

namespace TaskManager.Api.Application.Mappers;

public static class UserMapper
{
    public static UserResponseDto ToResponseDto(UserModel user)
    {
        return new UserResponseDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        };
    }

    public static UserModel ToEntity(CreateUserRequestDto request)
    {
        return new UserModel
        {
            Name = request.Name,
            Email = request.Email
        };
    }
}
