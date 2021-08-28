using System;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoListServiceCommands.Commands.AddItem
{
    public class AddTodoItemCommandHandler : IRequestHandler<AddTodoItemCommand, object>
    {
        private readonly ITodoListRepository _repository;
        private readonly IIdentityService _identity;
        private readonly ITodoColumnRepository _columnRepository;

        public AddTodoItemCommandHandler(ITodoListRepository repository, ITodoColumnRepository columnRepository,  IIdentityService identity)
        {
            _repository = repository;
            _identity = identity;
            _columnRepository = columnRepository;
        }

        public async Task<object> Handle(AddTodoItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = new TodoItem()
            {
                Id = request.Id,
                Text = request.Text,
                IsComplete = request.IsComplete,
                CreatedDate = DateTime.UtcNow,
                TodoColumnId = request.ColumnId
            };
            
            
            if (await _columnRepository.IsColumnExist(request.ColumnId))
            {
              await _columnRepository.CreateColumn("New", _identity.GetUserId());
            }

            await _repository.AddItemAsync(todoItem);
            return new {todoItem.Id, todoItem.CreatedDate};

        }
    }
}