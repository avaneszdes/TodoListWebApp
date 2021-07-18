using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.AdminServiceCommands.Commands.RemoveUserById;
using Services.AdminServiceCommands.GetAllUsers;
using Services.AdminServiceCommands.UpdateUser;
using Services.DtoModels.EmailDto;
using Services.DtoModels.UsersDto;
using Services.UserServiceCommands.Commands;
using Services.UserServiceCommands.Commands.SendLinkToEmail;
using Services.UserServiceCommands.Commands.UpdateUserPassword;
using Services.UserServiceCommands.Queries;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController: Controller
    {
        private readonly IMediator _mediator;
        public UserController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [Authorize(Roles = "user")]
        [HttpGet("{id:long}")]
        public async Task<string> GetUserPhoto(long id)
        {
            return await _mediator.Send(new GetUserPhotoQuery(id));
        }
        
        [Route("Api/User/SendEmail")]
        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> SendEmail([FromBody]Email email)
        {
            var message = await _mediator.Send(new SendEmailCommand(email.EmailAddress));
            if (message == "")
            {
                return Ok("The password sent");
            }

            return BadRequest("User with the same email address didn`t found");
        }
        
        [HttpPost]
        public async Task<IActionResult> UpdateEmail([FromBody]UpdateEmailCommand updateEmailCommand)
        {
            var message = await _mediator.Send(updateEmailCommand);
            if (message == "")
            {
                return Ok("The password sent");
            }

            return BadRequest("User with the same email address didn`t found");
        }
        
        [Authorize(Roles = "user,admin")]
        [HttpPut]
        public async Task<IActionResult> UpdateUser([FromBody]UpdateUserCommand user)
        {
            return Ok(await _mediator.Send(user));
        }
        
        [Authorize(Roles = "admin")]
        [HttpGet]
        public async Task<List<UserDtoModel>> GetUsers()
        {
            return await _mediator.Send(new GetAllUsersQuery());
        }
        
        [Authorize(Roles = "admin")]
        [HttpDelete("{id:long}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            return Ok(await _mediator.Send(new RemoveUserByIdCommand(id)));
        }
    }
}