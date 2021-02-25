using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace TodoListWebApp.Controllers
{
    [Route("registration")]
    public class RegistrationController : Controller
    {
        private IPersonService _service;
        private PersonValidator _validator;
        public RegistrationController(IPersonService personService)
        {
            _service = personService;
            _validator = new PersonValidator();
        }
        
        [HttpPost]
        public IActionResult Index([FromBody] User user)
        {
            if (_validator.Validate(user).IsValid)
            {
                _service.AddPerson(user);
                return Ok();
            }

            return BadRequest();
        }
    }
}