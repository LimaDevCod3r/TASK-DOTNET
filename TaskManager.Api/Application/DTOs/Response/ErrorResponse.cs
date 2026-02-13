using System.Text.Json.Serialization;

namespace TaskManager.Api.Application.DTOs.Response;

public class ErrorResponse
{
    public string Message { get; set; } = string.Empty;
    public int StatusCode { get; set; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public List<string>? Errors { get; set; }
}
