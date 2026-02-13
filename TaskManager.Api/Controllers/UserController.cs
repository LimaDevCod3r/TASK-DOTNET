using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Application.Interfaces;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ICurrentUserService _currentUserService;

    public UserController(IUserService userService, ICurrentUserService currentUserService)
    {
        _userService = userService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<List<UserResponseDto>>> GetAll()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }

    [HttpGet("{id:long}")]
    [Authorize]
    public async Task<ActionResult<UserResponseDto>> GetById(long id)
    {
        var user = await _userService.GetByIdAsync(id, _currentUserService.GetUserId());
        return Ok(user);
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserResponseDto>> Register([FromBody] CreateUserRequestDto request)
    {
        var savedUser = await _userService.AddUserAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = savedUser.Id }, savedUser);
    }

    [HttpDelete("{id:long}")]
    [Authorize]
    public async Task<IActionResult> Delete(long id)
    {
        await _userService.DeleteUserAsync(id, _currentUserService.GetUserId());
        return NoContent();
    }
}
