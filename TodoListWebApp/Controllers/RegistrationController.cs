using System.Linq;
using Entities;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/registration")]
    public class RegistrationController : Controller
    {
        private IRegistrationService _service;
        private PersonValidator _validator;
        public RegistrationController(IRegistrationService personService)
        {
            _service = personService;
            _validator = new PersonValidator();
        }
        
        [HttpPost]
        public IActionResult Index([FromBody] User user)
        {
            var existUser = _service.GetAll().FirstOrDefault(x => x.Email == user.Email);
            
            if (_validator.Validate(user).IsValid && existUser == null)
            {
                _service.AddUser(user);
                return Ok();
            }

            return Ok("User with same email address already exist");
        }
    }
}