using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;

namespace TaskManager.Api.Application.Interfaces;

public interface IAuthService
{
    Task<AuthResponse> LoginAsync(LoginRequestDto request);
    bool ValidateToken(string token);
}
