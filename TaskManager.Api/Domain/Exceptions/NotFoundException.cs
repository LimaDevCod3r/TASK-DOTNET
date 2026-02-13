namespace TaskManager.Api.Domain.Exceptions;

public class NotFoundException : BaseException
{
    public NotFoundException(string message, int statusCode) : base(message, statusCode)
    {
    }
}
