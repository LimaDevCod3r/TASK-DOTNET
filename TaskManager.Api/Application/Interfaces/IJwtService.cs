namespace TaskManager.Api.Application.Interfaces;

public interface IJwtService
{
    string GenerateToken(long userId, string email);
    bool ValidateToken(string token);
}
