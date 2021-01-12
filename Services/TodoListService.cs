using System.Collections.Generic;
using Entities;
using Repositories;

namespace Services
{
    public class TodoListService : ITodoListService
    {
        private ITodoListRepository _repository;
        public TodoListService(ITodoListRepository repository)
        {
            _repository = repository;
        }
        public List<TodoItem> GetAll()
        {
            return _repository.GetAll();
        }

        public void AddItem(TodoItem todoItem)
        {
           _repository.AddItem(todoItem);
        }
    }
}