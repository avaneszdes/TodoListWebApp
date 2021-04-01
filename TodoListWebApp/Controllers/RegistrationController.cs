using Entities;
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
            if (_validator.Validate(user).IsValid)
            {
                _service.AddUser(user);
                return Ok();
            }

            return BadRequest();
        }
    }
}