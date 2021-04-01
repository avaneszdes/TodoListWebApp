using System.Collections.Generic;
using System.Linq;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.TodoItemDto;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/todoList")]
    public class TodoListController : Controller
    {
        private readonly ITodoListService _service;

        public TodoListController(ITodoListService service)
        {
            _service = service;
        }
        
        [HttpGet("{page}")]
        public List<TodoItemDtoModel> GetAll(int page)
        {
            var a = _service.GetAll(page).ToList();
            return _service.GetAll(page).ToList();
        }

        [HttpPost]
        public IActionResult AddItem([FromBody] TodoItem todoItem)
        {
            _service.AddItem(todoItem);
            return Ok(todoItem.Id);
        }

        [HttpDelete("{id}")]
        public IActionResult RemoveItem(long id)
        {
            _service.RemoveItem(id);
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateItem([FromBody] TodoItem item)
        {
            _service.UpdateItem(item.Id, item.Text, item.IsComplete);
            return Ok();
        }
    }
}