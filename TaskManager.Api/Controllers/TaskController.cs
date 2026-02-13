using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Application.Interfaces;

namespace TaskManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;
    private readonly ICurrentUserService _currentUserService;

    public TaskController(ITaskService taskService, ICurrentUserService currentUserService)
    {
        _taskService = taskService;
        _currentUserService = currentUserService;
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskResponseDto>>> GetAll()
    {
        var tasks = await _taskService.GetAllByUserIdAsync(_currentUserService.GetUserId());
        return Ok(tasks);
    }

    [HttpGet("{id:long}")]
    public async Task<ActionResult<TaskResponseDto>> GetById(long id)
    {
        var task = await _taskService.GetByIdAsync(id, _currentUserService.GetUserId());
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponseDto>> Create([FromBody] CreateTaskRequestDto request)
    {
        var created = await _taskService.AddTaskAsync(_currentUserService.GetUserId(), request);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPatch("{id:long}")]
    public async Task<ActionResult<TaskResponseDto>> Update(long id, [FromBody] UpdateTaskRequestDto request)
    {
        var updated = await _taskService.UpdateTaskAsync(id, _currentUserService.GetUserId(), request);
        return Ok(updated);
    }

    [HttpDelete("{id:long}")]
    public async Task<IActionResult> Delete(long id)
    {
        await _taskService.DeleteTaskAsync(id, _currentUserService.GetUserId());
        return NoContent();
    }
}
