using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Application.Interfaces;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login([FromBody] LoginRequestDto request)
    {
        var authResponse = await _authService.LoginAsync(request);
        return Ok(authResponse);
    }

    [HttpPost("validate")]
    public IActionResult ValidateToken([FromBody] string token)
    {
        var isValid = _authService.ValidateToken(token);
        return Ok(new { Valid = isValid });
    }
}
