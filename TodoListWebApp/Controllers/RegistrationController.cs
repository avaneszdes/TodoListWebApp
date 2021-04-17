using System.Linq;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.AdminServiceCommands.Commands.AddUser;
using Services.AdminServiceCommands.GetAllUsers;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/registration")]
    public class RegistrationController : Controller
    {
        private readonly IMediator _mediator;
        private readonly PersonValidator _validator;
        public RegistrationController(IMediator mediator)
        {
            _mediator = mediator;
            _validator = new PersonValidator();
        }
        
        [HttpPost]
        public async Task<IActionResult> Registration([FromBody] AddUserCommand user)
        {
            var existUser = _mediator.Send(new GetAllUsersQuery()).Result.Find(x => x.Email == user.Email);
            
            if ((await _validator.ValidateAsync(user)).IsValid && existUser == null)
            {
                return Ok(await _mediator.Send(user));
            }

            return BadRequest("User with the same email address already exist");
        }
    }
}