using MediatR;

namespace Services.TodoListServiceCommands.RemoveItem
{
    public class RemoveItemCommand : IRequest
    {
        public RemoveItemCommand(long id)
        {
            Id = id;
        }

        public long Id { get; set; }
    }
}