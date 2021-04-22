using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.AddItem
{
    public class AddTodoItemCommandHandler : IRequestHandler<AddTodoItemCommand, long>
    {
        private readonly ITodoListRepository _repository;
        private readonly IIdentityService _identity;

        public AddTodoItemCommandHandler(ITodoListRepository repository, IIdentityService identity)
        {
            _repository = repository;
            _identity = identity;
        }

        public async Task<long> Handle(AddTodoItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = new TodoItem()
                {Id = request.Id, Text = request.Text, IsComplete = request.IsComplete, UserId = _identity.GetUserId()};
            await _repository.AddItemAsync(todoItem);
            return todoItem.Id;
        }
    }
}