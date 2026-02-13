namespace TaskManager.Api.Domain.Exceptions;

public class ConflictException : BaseException
{
    public ConflictException(string message, int statusCode) : base(message, statusCode)
    {
    }
}
