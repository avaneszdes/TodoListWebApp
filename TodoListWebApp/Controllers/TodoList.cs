using System.Collections.Generic;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoList : ControllerBase
    {
        private ITodoListService _service;
        public TodoList(ITodoListService service)
        {
            _service = service;
        }

        [HttpGet]
        public List<TodoItem> GetAll()
        {
            return _service.GetAll();
        }
        
        [HttpPost]
        public IActionResult AddItem(TodoItem todoItem)
        {
            _service.AddItem(todoItem);
            return Ok();
        }
        
        
    }
}