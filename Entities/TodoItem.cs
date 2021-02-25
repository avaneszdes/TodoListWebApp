using System;

namespace Entities
{
    public class TodoItem : BaseEntity
    {
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}