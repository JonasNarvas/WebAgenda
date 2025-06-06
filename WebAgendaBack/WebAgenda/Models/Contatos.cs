namespace WebAgenda.Models
{
    public class Contatos
    {
        public int Id { get; set; }
        public required string Nome { get; set; }
        public required string Apelido { get; set; }
        public required string Cpf { get; set; }
        public required string Telefone { get; set; }
        public required string Email { get; set; }
        public DateTime DataCadastro { get; set; } = DateTime.UtcNow;
        public DateTime? DataUltimaAlteracao { get; set; }
    }
}
