using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ApplicationContext
{
    public class TodoColumnConfiguration : IEntityTypeConfiguration<TodoColumn>
    {
        public void Configure(EntityTypeBuilder<TodoColumn> builder)
        {
        }
    }
}