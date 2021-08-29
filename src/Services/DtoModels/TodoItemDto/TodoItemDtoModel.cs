using System;

namespace Services.DtoModels.TodoItemDto
{
    public class TodoItemDtoModel
    {
        public long Id { get; set; }
        public string Text { get; set; }
        public bool IsComplete { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}