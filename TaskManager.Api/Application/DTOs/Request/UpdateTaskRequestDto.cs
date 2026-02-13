using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Application.DTOs.Request;

public class UpdateTaskRequestDto
{
    [MaxLength(100, ErrorMessage = "O título pode ter no máximo 100 caracteres")]
    public string? Title { get; set; }

    [MaxLength(500, ErrorMessage = "A descrição pode ter no máximo 500 caracteres")]
    public string? Description { get; set; }

    public bool? IsCompleted { get; set; }
}
