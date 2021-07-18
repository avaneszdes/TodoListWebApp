using System;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.Commands.UpdateTodoList
{
    public class AddTodoItemCommandHandler : IRequestHandler<AddItem.AddTodoItemCommand, object>
    {
        private readonly ITodoListRepository _repository;
        private readonly IIdentityService _identity;

        public AddTodoItemCommandHandler(ITodoListRepository repository, IIdentityService identity)
        {
            _repository = repository;
            _identity = identity;
        }

        public async Task<object> Handle(AddItem.AddTodoItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = new TodoItem()
                {Id = request.Id,
                    Text = request.Text,
                    IsComplete = request.IsComplete, 
                    UserId = _identity.GetUserId(), 
                    CreatedDate = DateTime.UtcNow
                    
                };
            
            await _repository.AddItemAsync(todoItem);
            return new {todoItem.Id, todoItem.CreatedDate};
        }
    }
}