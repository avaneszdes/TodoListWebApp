using System;
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
        private readonly ITodoListService _service;
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
        public IActionResult AddItem([FromBody]TodoItem todoItem)
        {
            _service.AddItem(todoItem);
            return Ok(todoItem.Id);
        }
        
        [HttpDelete("{id}")]
        public IActionResult RemoveItem(int id)
        {
            _service.RemoveItem(id);
            return Ok();
        }
        
        [HttpPut]
        public IActionResult UpdateItem([FromBody] TodoItem item)
        {
            _service.UpdateItem(item.Id, item.Text, item.Finished);
            return Ok();
        }
    }
}