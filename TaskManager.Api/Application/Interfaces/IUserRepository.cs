using TaskManager.Api.Domain.Entities;

namespace TaskManager.Api.Application.Interfaces;

public interface IUserRepository
{
    Task<UserModel?> GetByIdAsync(long userId);
    Task<bool> GetByEmailAsync(string email);
    Task<UserModel?> GetUserByEmailAsync(string email);
    Task<List<UserModel>> GetAllAsync();
    Task<UserModel> CreateAsync(UserModel user);
    Task DeleteAsync(UserModel user);
}
