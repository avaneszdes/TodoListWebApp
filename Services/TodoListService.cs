using System.Collections.Generic;
using System.Linq;
using Entities;
using Microsoft.AspNetCore.Http;
using Repositories;

namespace Services
{
    public class TodoListService : ITodoListService
    {
        private ITodoListRepository _repository;
        private readonly IIdentityService _identity;

        public TodoListService(ITodoListRepository repository)
        {
            _repository = repository;
            _identity = new IdentityService(new HttpContextAccessor());
        }

        public List<TodoItem> GetAll()
        {
            return _repository.GetAll().Where(x => x.PersonId == _identity.GetTokenId()).ToList();
        }

        public void AddItem(TodoItem todoItem)
        {
            todoItem.PersonId = _identity.GetTokenId();
            _repository.AddItem(todoItem);
        }

        public void RemoveItem(int id)
        {
            _repository.RemoveItem(id);
        }

        public void UpdateItem(int id, string text, bool finished)
        {
            _repository.UpdateItem(new TodoItem {Id = id, Text = text, Finished = finished, PersonId = _identity.GetTokenId()});
        }
    }
}