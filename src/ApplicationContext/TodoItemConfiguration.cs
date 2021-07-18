using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApplicationContext
{
    public class TodoItemConfiguration : IEntityTypeConfiguration<TodoItem>
    {
        public void Configure(EntityTypeBuilder<TodoItem> builder)
        {
            builder.Navigation(x => x.User);
            builder.HasOne(x => x.User)
                .WithMany(x => x.TodoItems)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Property(x => x.Text).IsRequired().HasMaxLength(200);
        }
    }
}