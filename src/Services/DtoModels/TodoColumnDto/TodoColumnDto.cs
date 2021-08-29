using System.Collections.Generic;
using Services.DtoModels.TodoItemDto;

namespace Services.DtoModels.TodoColumnDto
{
    public class TodoColumnDto
    {
        public string ColumnName { get; set; }
        public long Id { get; set; }
        public List<TodoItemDtoModel> TodoItems { get; set; }
    }
}