using System.Collections.Generic;

namespace Entities
{
    public class Person : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        
        public List<TodoItem> TodoItems { get; set; }

        public Person()
        {
            TodoItems = new List<TodoItem>();
        }
    }
}