using Microsoft.EntityFrameworkCore;
using TaskManager.Api.Application.Interfaces;
using TaskManager.Api.Domain.Entities;
using TaskManager.Api.Infrastructure.Data;

namespace TaskManager.Api.Infrastructure.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<TaskModel>> GetAllByUserIdAsync(long userId)
    {
        return await _context.Tasks
            .Where(t => t.UserId == userId)
            .ToListAsync();
    }

    public async Task<TaskModel?> GetByIdAsync(long id, long userId)
    {
        return await _context.Tasks
            .FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
    }

    public async Task<TaskModel> AddAsync(TaskModel task)
    {
        await _context.AddAsync(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task UpdateAsync(TaskModel task)
    {
        _context.Tasks.Update(task);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(TaskModel task)
    {
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
    }
}
