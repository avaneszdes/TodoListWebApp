using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repositories;
using Services.TodoItemDto;

namespace Services
{
    public class TodoListService : ITodoListService
    {
        private ITodoListRepository _repository;
        private readonly IIdentityService _identity;
        private readonly IMapper _mapper;

        public TodoListService(ITodoListRepository repository, IIdentityService identity, IMapper mapper)
        {
            _repository = repository;
            _identity = identity;
            _mapper = mapper;
        }

        public List<TodoItemDtoModel> GetAll(int page)
        {
            return _repository.GetAll()
                .Where(x => x.UserId == _identity.GetUserId())
                .OrderBy(x => x.Id)
                .GetPage(page, 10)
                .ProjectTo<TodoItemDtoModel>(_mapper.ConfigurationProvider)
                .ToList();
        }

        public void AddItem(TodoItem todoItem)
        {
            todoItem.UserId = _identity.GetUserId();
            _repository.AddItem(todoItem);
        }

        public void RemoveItem(long id)
        {
            _repository.RemoveItem(id);
        }   

        public void UpdateItem(long id, string text, bool isComplete)
        {
            _repository.UpdateItem(new TodoItem {Id = id, Text = text, IsComplete = isComplete, UserId = _identity.GetUserId()});
        }

        

    }
}