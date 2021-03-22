using System.Collections.Generic;
using System.Linq;

namespace Entities
{
    public class User : BaseEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public string Photo { get; set; }
        public List<TodoItem> TodoItems { get; set; }

        public User()
        {
            TodoItems = new List<TodoItem>();
        }
    }
}