using Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationContext
{
    public sealed class AppDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<EmailConfirmData> EmailConfirmators { get; set; }

        public AppDbContext(DbContextOptions options) : base(options)
        {
            Database.EnsureCreated();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new TodoItemConfiguration());
            var adminRole = new Role {Id = 1, Name = "admin"};
            var userRole = new Role {Id = 2, Name = "user"};

            var admin = new User
            {
                Id = 1,
                LastName = "AVA",
                Email = "avaneszdes@gmail.com",
                Password = "1QWEqwe!",
                RoleId = adminRole.Id,
                FirstName = "VLAD"
            };

            modelBuilder.Entity<Role>().HasData(adminRole, userRole);
            modelBuilder.Entity<User>().HasData(admin);
            base.OnModelCreating(modelBuilder);
        }
    }
}