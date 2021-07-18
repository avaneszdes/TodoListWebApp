using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.Commands.UpdateTodoItem
{
    public class UpdateTodoItemCommandHandler : AsyncRequestHandler<UpdateTodoItemCommand>
    {
        private readonly ITodoListRepository _repository;
        private readonly IIdentityService _identity;

        public UpdateTodoItemCommandHandler(ITodoListRepository repository, IIdentityService identity)
        {
            _identity = identity;
            _repository = repository;
        }

        protected override async Task Handle(UpdateTodoItemCommand request, CancellationToken cancellationToken)
        {
            await _repository.UpdateItemAsync(new TodoItem
            {
                Id = request.Id, Text = request.Text, IsComplete = request.IsComplete, UserId = _identity.GetUserId()
            });
        }
    }
}