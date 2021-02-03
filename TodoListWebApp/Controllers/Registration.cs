using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace TodoListWebApp.Controllers
{
    [Route("registration")]
    public class Registration : Controller
    {
        private IPersonService _service;
        private PersonValidator _validator;
        public Registration(IPersonService personService)
        {
            _service = personService;
            _validator = new PersonValidator();
        }
        
        [HttpPost]
        public IActionResult Index([FromBody] Person person)
        {
            if (_validator.Validate(person).IsValid)
            {
                _service.AddPerson(person);
                return Ok();
            }

            return BadRequest();
        }
    }
}