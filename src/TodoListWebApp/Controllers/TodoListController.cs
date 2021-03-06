﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Services.DtoModels.TodoItemDto;
using Services.TodoListServiceCommands.Commands.AddItem;
using Services.TodoListServiceCommands.Commands.RemoveItem;
using Services.TodoListServiceCommands.Commands.UpdateTodoItem;
using Services.TodoListServiceCommands.Queries.GetAll;

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
            return Ok(await _mediator.Send(todoItem));
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> RemoveItem(long id)
        {
            return Ok(await _mediator.Send(new RemoveItemCommand(id)));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateItem([FromBody] TodoItem item)
        {
            return Ok(await _mediator.Send(new UpdateTodoItemCommand(item.Id, item.Text, item.IsComplete)));
        }
    }
}