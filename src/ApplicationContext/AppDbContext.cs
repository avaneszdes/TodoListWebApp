using System;
using System.Collections.Generic;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationContext
{
    public sealed class AppDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<TodoColumn> TodoColumns { get; set; }
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
            modelBuilder.ApplyConfiguration(new UserConfiguration());
            modelBuilder.ApplyConfiguration(new TodoColumnConfiguration());
           

            var adminRole = new Role {Id = 1, Name = "admin"};
            var userRole = new Role {Id = 2, Name = "user"};
            
            var todoItem = new TodoItem
            {
                Id = 1,
                Text = "1",
                IsComplete = false,
                CreatedDate = DateTime.UtcNow,
                TodoColumnId = 1,
                UpdatedItemId = 1
               
            };
            
            var todoColumn = new TodoColumn
            {
                Id = 1,
                ColumnName = "New",
                TodoItems = new List<TodoItem>(){todoItem},
            };

            var admin = new User
            {
                Id = 1,
                LastName = "AVA",
                Email = "avaneszdes@gmail.com",
                Password = "1QWEqwe!",
                RoleId = adminRole.Id,
                FirstName = "VLAD"
            };

            var user = new User
            {
                Id = 2,
                LastName = "AVA",
                Email = "123avaneszdes@gmail.com",
                Password = "123qwe!@#QWE",
                RoleId = userRole.Id,
                FirstName = "VLAD",
                TodoColumns = new List<TodoColumn>()
            };

            modelBuilder.Entity<Role>().HasData(adminRole, userRole);
            modelBuilder.Entity<User>().HasData(admin, user);
           
            base.OnModelCreating(modelBuilder);
        }
    }
}