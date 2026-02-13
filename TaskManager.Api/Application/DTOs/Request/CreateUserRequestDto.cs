using System.ComponentModel.DataAnnotations;

namespace TaskManager.Api.Application.DTOs.Request;

public class CreateUserRequestDto
{
    [Required(ErrorMessage = "O nome é obrigatório.")]
    [MaxLength(100, ErrorMessage = "O nome não pode ter mais de 100 caracteres.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "O email é obrigatório.")]
    [EmailAddress(ErrorMessage = "O email informado é inválido.")]
    [StringLength(255, MinimumLength = 3, ErrorMessage = "O email deve ter entre 3 e 255 caracteres.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "A senha é obrigatória")]
    public string Password { get; set; } = string.Empty;
}
