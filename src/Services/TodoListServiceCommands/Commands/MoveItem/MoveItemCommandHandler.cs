using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Repositories;

namespace Services.TodoListServiceCommands.Commands.MoveItem
{
    public class MoveItemCommandHandler : AsyncRequestHandler<MoveItemCommand>
    {
        private readonly ITodoColumnRepository _columnRepository;
        private readonly ITodoListRepository _todoListRepository;
        private readonly IIdentityService _identity;

        public MoveItemCommandHandler(ITodoColumnRepository columnRepository,
            IIdentityService identity, ITodoListRepository todoListRepository)
        {
            _columnRepository = columnRepository;
            _identity = identity;
            _todoListRepository = todoListRepository;
        }

        protected override async Task Handle(MoveItemCommand request, CancellationToken cancellationToken)
        {
            var todoItem = await _todoListRepository.GetAll().FirstOrDefaultAsync
            (x => x.TodoColumnId == request.FromColumnId && x.Id == request.FromItemId,
                cancellationToken: cancellationToken);

            todoItem.TodoColumnId = request.ToColumnId;
            await _todoListRepository.UpdateItemAsync(todoItem);
            
            
            var columnTo = await _columnRepository
                .GetAllColumns(_identity.GetUserId())
                .FirstOrDefaultAsync(x => x.Id == request.ToColumnId,cancellationToken);

            var tempId = 0L;

            var todoItems = new List<TodoItem>();
            
            Parallel.ForEach(columnTo.TodoItems, item =>
            {
                if (item.Id >= request.ToItemId)
                {
                    item.UpdatedItemId = tempId + 1;
                }
                todoItems.Add(item);
                tempId = item.UpdatedItemId;
            });

            await _todoListRepository.UpdateItemsAsync(todoItems);
        }
    }
}