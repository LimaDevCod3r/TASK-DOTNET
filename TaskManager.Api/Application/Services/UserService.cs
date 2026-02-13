using TaskManager.Api.Application.DTOs.Request;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Application.Interfaces;
using TaskManager.Api.Application.Mappers;
using TaskManager.Api.Domain.Exceptions;

namespace TaskManager.Api.Application.Services;

public class UserService : IUserService
{
    private readonly IUserRepository _repository;
    private readonly IPasswordService _passwordService;

    public UserService(IUserRepository repository, IPasswordService passwordService)
    {
        _repository = repository;
        _passwordService = passwordService;
    }

    public async Task<List<UserResponseDto>> GetAllAsync()
    {
        var users = await _repository.GetAllAsync();
        return users.Select(UserMapper.ToResponseDto).ToList();
    }

    public async Task<UserResponseDto> GetByIdAsync(long id, long requestUserId)
    {
        if (id != requestUserId)
            throw new ForbiddenException("Acesso negado: você só pode ver seu próprio perfil.");

        var user = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"Usuário com id {id} não foi encontrado.", 404);
        return UserMapper.ToResponseDto(user);
    }

    public async Task<UserResponseDto> AddUserAsync(CreateUserRequestDto dto)
    {
        var emailExists = await _repository.GetByEmailAsync(dto.Email);
        if (emailExists)
            throw new ConflictException("Email já está em uso.", 409);

        var hashedPassword = _passwordService.HashPassword(dto.Password);
        var entity = UserMapper.ToEntity(dto);
        entity.Password = hashedPassword;

        var savedUser = await _repository.CreateAsync(entity);
        return UserMapper.ToResponseDto(savedUser);
    }

    public async Task DeleteUserAsync(long id, long requestUserId)
    {
        if (id != requestUserId)
            throw new ForbiddenException("Acesso negado: você só pode excluir sua própria conta.");

        var entity = await _repository.GetByIdAsync(id)
            ?? throw new NotFoundException($"Usuário com id {id} não foi encontrado.", 404);
        await _repository.DeleteAsync(entity);
    }
}
