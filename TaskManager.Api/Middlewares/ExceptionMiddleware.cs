using Microsoft.Extensions.Logging;
using TaskManager.Api.Application.DTOs.Response;
using TaskManager.Api.Domain.Exceptions;

namespace TaskManager.Api.Middlewares;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            _logger.LogWarning(ex, "Recurso não encontrado: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex.Message, StatusCodes.Status404NotFound);
        }
        catch (ConflictException ex)
        {
            _logger.LogWarning(ex, "Conflito: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex.Message, StatusCodes.Status409Conflict);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning(ex, "Validação: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex.Message, ex.StatusCode);
        }
        catch (UnauthorizedException ex)
        {
            _logger.LogWarning(ex, "Não autorizado: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex.Message, StatusCodes.Status401Unauthorized);
        }
        catch (ForbiddenException ex)
        {
            _logger.LogWarning(ex, "Acesso negado: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex.Message, StatusCodes.Status403Forbidden);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Erro interno: {Message}", ex.Message);
            await HandleExceptionAsync(context, "Erro interno do servidor", StatusCodes.Status500InternalServerError);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, string message, int statusCode)
    {
        context.Response.StatusCode = statusCode;
        context.Response.ContentType = "application/json";

        var response = new ErrorResponse
        {
            Message = message,
            StatusCode = statusCode
        };

        await context.Response.WriteAsJsonAsync(response);
    }
}
