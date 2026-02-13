using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;

namespace TaskManager.Api.Application.Interfaces;

public interface IUserService
{
    Task<List<UserResponseDto>> GetAllAsync();
    Task<UserResponseDto> GetByIdAsync(long id, long requestUserId);
    Task<UserResponseDto> AddUserAsync(CreateUserRequestDto dto);
    Task DeleteUserAsync(long id, long requestUserId);
}
