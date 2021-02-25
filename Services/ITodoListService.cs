using System.Collections.Generic;
using Entities;
using Microsoft.AspNetCore.Http;
using Services.TodoItemDto;

namespace Services
{
    public interface ITodoListService
    {
        List<TodoItemDtoModel> GetAll(int page);
        void AddItem(TodoItem todoItem);
        void RemoveItem(int id);
        void UpdateItem(int id, string text, bool finished);
    }
}