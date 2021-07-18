using MediatR;

namespace Services.TodoListServiceCommands.Commands.UpdateTodoList
{
    public class AddTodoItemCommand : IRequest<object>
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public long UserId { get; set; }

        public string CreatedDate { get; set; }
    }
}