using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApplicationContext
{
    public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
    {
        public void Configure(EntityTypeBuilder<TodoItem> builder)
        {
            builder.Navigation(x => x.Person);
            
            
            
            
            builder.HasOne(x => x.Person)
                .WithMany(x => x.TodoItems)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}