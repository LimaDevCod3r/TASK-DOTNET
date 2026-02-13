using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using TaskManager.Api.Application.Interfaces;
using TaskManager.Api.Domain.Exceptions;

namespace TaskManager.Api.Infrastructure.Http;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public long GetUserId()
    {
        var userIdClaim = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdClaim))
            throw new UnauthorizedException("Token inválido: usuário não identificado.");

        return long.Parse(userIdClaim);
    }
}
