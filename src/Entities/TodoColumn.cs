using System.Collections.Generic;

namespace Entities
{
    public class TodoColumn : BaseEntity
    {
        public string ColumnName { get; set; }
        public List<TodoItem> TodoItems { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
    }
}