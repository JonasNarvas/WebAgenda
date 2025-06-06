using System.ComponentModel.DataAnnotations;

namespace WebAgenda.DTOs
{
    public class ContatoUpdateDTO
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public required string Nome { get; set; }

        public required string Apelido { get; set; }

        [Required]
        [StringLength(14, MinimumLength = 11)]
        public required string Cpf { get; set; }

        public required string Telefone { get; set; }

        [Required]
        [EmailAddress]
        public required string Email { get; set; }
    }
}
