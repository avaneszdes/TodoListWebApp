using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.AdminServiceCommands.Commands.RemoveUserById;
using Services.AdminServiceCommands.GetAllUsers;
using Services.AdminServiceCommands.UpdateUser;
using Services.UsersDto;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "admin")]
    public class AdminController : Controller
    {
        private readonly IMediator _mediator;

        public AdminController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        public async Task<List<UserDtoModel>> GetUsers()
        {
            return await _mediator.Send(new GetAllUsersQuery());
        }

        [HttpDelete("{id:long}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            return Ok(await _mediator.Send(new RemoveUserByIdCommand(id)));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserCommand user)
        {
            return Ok(await _mediator.Send(user));
        }
    }
}