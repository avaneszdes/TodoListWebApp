using MediatR;

namespace Services.TodoListServiceCommands.UpdateTodoItem
{
    public class UpdateTodoItemCommand: IRequest
    {
        public UpdateTodoItemCommand(long id, string text, bool isComplete)
        {
            Text = text;
            Id = id;
            IsComplete = isComplete;
        }

        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public long Id { get; set; }
    }
}