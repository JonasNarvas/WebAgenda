using System.ComponentModel.DataAnnotations;

namespace WebAgenda.DTOs
{
    public class ContatoDeleteDTO
    {
        [Required]
        public int Id { get; set; }
    }
}
