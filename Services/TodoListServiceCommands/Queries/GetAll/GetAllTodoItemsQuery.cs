using System.Collections.Generic;
using MediatR;
using Services.DtoModels.TodoItemDto;

namespace Services.TodoListServiceCommands.Queries.GetAll
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