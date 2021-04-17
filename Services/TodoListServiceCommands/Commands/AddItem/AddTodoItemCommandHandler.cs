using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.AddItem
{
    public class AddTodoItemCommandHandler : IRequestHandler<AddTodoItemCommand>
    {
        private readonly ITodoListRepository _repository;
        private readonly IIdentityService _identity;

        public AddTodoItemCommandHandler(ITodoListRepository repository, IIdentityService identity,  IMapper mapper)
        {
            _repository = repository;
            _identity = identity;
        }

        public Task<Unit> Handle(AddTodoItemCommand request, CancellationToken cancellationToken)
        {
             request.UserId =  _identity.GetUserId();
              _repository.AddItem( new TodoItem(){ Id = request.Id, Text = request.Text, IsComplete = request.IsComplete, UserId = request.UserId});
              
              return Task.FromResult(Unit.Value);
        }
    }
}