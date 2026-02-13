using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Application.Interfaces;
using TaskManager.Api.Application.Mappers;
using TaskManager.Api.Domain.Exceptions;

namespace TaskManager.Api.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IJwtService _jwtService;
    private readonly IPasswordService _passwordService;

    public AuthService(
        IUserRepository userRepository,
        IJwtService jwtService,
        IPasswordService passwordService)
    {
        _userRepository = userRepository;
        _jwtService = jwtService;
        _passwordService = passwordService;
    }

    public async Task<AuthResponse> LoginAsync(LoginRequestDto request)
    {
        var user = await _userRepository.GetUserByEmailAsync(request.Email);
        if (user == null || !_passwordService.VerifyPassword(request.Password, user.Password))
            throw new UnauthorizedException("Email ou senha inválidos.");

        var token = _jwtService.GenerateToken(user.Id, user.Email);

        return new AuthResponse
        {
            Token = token,
            ExpiresAt = DateTime.UtcNow.AddHours(8),
            User = UserMapper.ToResponseDto(user)
        };
    }

    public bool ValidateToken(string token) => _jwtService.ValidateToken(token);
}
