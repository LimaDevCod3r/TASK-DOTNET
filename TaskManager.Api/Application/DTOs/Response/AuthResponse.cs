namespace TaskManager.Api.Application.DTOs.Response;

public class AuthResponse
{
    public UserResponseDto User { get; set; } = new();
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
}
