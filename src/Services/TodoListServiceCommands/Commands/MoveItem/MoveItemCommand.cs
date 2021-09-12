using MediatR;

namespace Services.TodoListServiceCommands.Commands.MoveItem
{
    public class MoveItemCommand: IRequest
    {
        public int FromColumnId { get; set; }
        public int ToColumnId { get; set; }
        public int FromItemId { get; set; }
        public int ToItemId { get; set; }
    }
}