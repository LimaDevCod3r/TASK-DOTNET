using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Application.DTOs.Request;

public class CreateTaskRequestDto
{
    [Required(ErrorMessage = "O título é obrigatório")]
    [MaxLength(100, ErrorMessage = "O título pode ter no máximo 100 caracteres")]
    public string Title { get; set; } = string.Empty;

    [Required(ErrorMessage = "A descrição é obrigatória")]
    [MaxLength(500)]
    public string Description { get; set; } = string.Empty;
}
