
using Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationContext
{
    public class AppDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TodoItemConfiguration());
            var admin = new User
            {
                Id = 1,
                LastName = "AVA",
                Email = "avaneszdes@gmail.com",
                Password = "1QWEqwe!",
                Role = "admin",
                FirstName = "VLAD"
            };

            modelBuilder.Entity<User>().HasData(admin);
            base.OnModelCreating(modelBuilder);
        }
    }
}