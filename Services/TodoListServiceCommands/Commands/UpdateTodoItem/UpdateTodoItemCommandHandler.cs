using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.UpdateTodoItem
{
    public class UpdateTodoItemCommandHandler : IRequestHandler<UpdateTodoItemCommand>
    {
        private readonly ITodoListRepository _repository;
        private readonly IIdentityService _identity;

        public UpdateTodoItemCommandHandler(ITodoListRepository repository, IIdentityService identity)
        {
            _identity = identity;
            _repository = repository;
        }

        public Task<Unit> Handle(UpdateTodoItemCommand request, CancellationToken cancellationToken)
        {
            _repository.UpdateItem(new TodoItem
            {
                Id = request.Id, Text = request.Text, IsComplete = request.IsComplete, UserId = _identity.GetUserId()
            });

            return Task.FromResult(Unit.Value);
        }
    }
}