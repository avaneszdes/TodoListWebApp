using System.Collections.Generic;
using Entities;

namespace Repositories
{
    public interface ITodoListRepository
    {
        List<TodoItem> GetAll();
        void AddItem(TodoItem todoItem);
        void RemoveItem(int id);
        void UpdateItem(int id, string text, bool finished);
    }
}