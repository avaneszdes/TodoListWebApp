using System.Collections.Generic;
using Entities;

namespace Services
{
    public interface ITodoListService
    {
        List<TodoItem> GetAll();
        void AddItem(TodoItem todoItem);

    }
}