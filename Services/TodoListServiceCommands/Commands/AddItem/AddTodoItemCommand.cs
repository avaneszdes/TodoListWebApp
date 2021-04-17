using Entities;
using MediatR;

namespace Services.TodoListServiceCommands.AddItem
{
    public class AddTodoItemCommand : IRequest
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public long UserId { get; set; }
    }
}