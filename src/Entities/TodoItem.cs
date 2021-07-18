using System;

namespace Entities
{
    public class TodoItem : BaseEntity
    {
        public string Text { get; set; }
        
        public string TypeOfList { get; set; }
        public bool IsComplete { get; set; }
        public long UserId { get; set; }
        public User User { get; set; }
        
        public DateTime CreatedDate { get; set; }
    }
}