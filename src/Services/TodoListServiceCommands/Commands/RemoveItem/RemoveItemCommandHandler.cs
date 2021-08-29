using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.Commands.RemoveItem
{
    public class RemoveItemCommandHandler : AsyncRequestHandler<RemoveItemCommand>
    {
        private readonly ITodoListRepository _repository;

        public RemoveItemCommandHandler(ITodoListRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(RemoveItemCommand request, CancellationToken cancellationToken)
        {
           await _repository.RemoveItemAsync(request.Id);
        }
    }
}