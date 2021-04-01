using System.Collections.Generic;
using System.Linq;
using Entities;

namespace Repositories
{
    public interface ITodoListRepository
    {
        IQueryable<TodoItem> GetAll();
        void AddItem(TodoItem todoItem);
        void RemoveItem(long id);
        void UpdateItem(TodoItem todoItem);
    }
}