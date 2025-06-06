namespace WebAgenda.Data
{ 
    using Microsoft.EntityFrameworkCore;
    using WebAgenda.Models;
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Contatos> Contatos { get; set; } = null!;
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contatos>().ToTable("Contatos");
            modelBuilder.Entity<Contatos>().HasKey(c => c.Id);
            modelBuilder.Entity<Contatos>().Property(c => c.Nome).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Contatos>().Property(c => c.Email).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<Contatos>().Property(c => c.Telefone).IsRequired().HasMaxLength(15);
        }
    }
}
