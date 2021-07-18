using System.Collections.Generic;

namespace Entities
{
    public class TodoItemConcrete : BaseEntity
    {
        public string TodoItemListName { get; set; }

        public List<TodoItem> TodoItems = new ();
        
        public long UserId { get; set; }
        public User User { get; set; }
        
    }
}