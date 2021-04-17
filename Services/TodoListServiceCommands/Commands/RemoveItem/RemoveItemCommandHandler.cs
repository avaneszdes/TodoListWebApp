using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.RemoveItem
{
    public class RemoveItemCommandHandler : IRequestHandler<RemoveItemCommand>
    {
        private readonly ITodoListRepository _repository;

        public RemoveItemCommandHandler(ITodoListRepository repository)
        {
            _repository = repository;
        }

        public async Task<Unit> Handle(RemoveItemCommand request, CancellationToken cancellationToken)
        {
            _repository.RemoveItem(request.Id);
            return Unit.Value;
        }
    }
}