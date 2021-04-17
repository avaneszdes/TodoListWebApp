using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.TodoItemDto;
using Services.TodoListServiceCommands;
using Services.TodoListServiceCommands.AddItem;
using Services.TodoListServiceCommands.RemoveItem;
using Services.TodoListServiceCommands.UpdateTodoItem;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/todoList")]
    public class TodoListController : Controller
    {
        private readonly IMediator _mediator;

        public TodoListController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet("{page:int}")]
        public async Task<List<TodoItemDtoModel>> GetAll(int page)
        {
            return (List<TodoItemDtoModel>) await _mediator.Send(new GetAllTodoItemsQuery(page));
        }

        [HttpPost]
        public async Task<IActionResult> AddItem([FromBody] AddTodoItemCommand todoItem)
        {
            await _mediator.Send(todoItem);
            return Ok(todoItem.Id);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveItem(long id)
        {
            _mediator.Send(new RemoveItemCommand(id));
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateItem([FromBody] TodoItem item)
        {
            return Ok(_mediator.Send(new UpdateTodoItemCommand(item.Id, item.Text, item.IsComplete)));
        }
    }
}