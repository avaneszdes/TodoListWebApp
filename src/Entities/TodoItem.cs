using System;

namespace Entities
{
    public class TodoItem : BaseEntity
    {
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public DateTime CreatedDate { get; set; }
        public long TodoColumnId { get; set; }
        
        public TodoColumn TodoColumn { get; set; }
       
    }
}