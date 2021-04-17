using System.Collections.Generic;
using MediatR;
using Services.TodoItemDto;

namespace Services.TodoListServiceCommands
{
    public class GetAllTodoItemsQuery : IRequest<List<TodoItemDtoModel>>, IRequest<int>
    {
        public GetAllTodoItemsQuery(int page)
        {
            Page = page;
        }
        public int Page { get; }
    }
}