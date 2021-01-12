using System;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace ApplicationContext
{
    public class AppDbContext : DbContext
    {
        public DbSet<TodoItem> TodoItems { get; set; }
        
        public AppDbContext(DbContextOptions options):base(options)
        {
            Database.EnsureCreated();
        }
        
    }
}