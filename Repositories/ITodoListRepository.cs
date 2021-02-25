using System.Collections.Generic;
using System.Linq;
using Entities;

namespace Repositories
{
    public interface ITodoListRepository
    {
        IQueryable<TodoItem> GetAll();
        void AddItem(TodoItem todoItem);
        void RemoveItem(int id);
        void UpdateItem(TodoItem todoItem);
    }
}