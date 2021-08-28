using System;
using MediatR;

namespace Services.TodoListServiceCommands.Commands.AddItem
{
    public class AddTodoItemCommand : IRequest<object>
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public string CreatedDate { get; set; }
        public long ColumnId { get; set; }
        
        
    }
}