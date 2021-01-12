using System.Collections.Generic;
using Entities;

namespace Repositories
{
    public interface ITodoListRepository
    {
        List<TodoItem> GetAll();
        void AddItem(TodoItem todoItem);

    }
}