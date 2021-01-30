using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace TodoListWebApp.Controllers
{
    [Route("registration")]
    public class Registration : Controller
    {
        private IPersonService _service;
        public Registration(IPersonService personService)
        {
            _service = personService;
        }
        
        [HttpPost]
        public IActionResult Index([FromBody] Person person)
        {
            if (person != null)
            {
                _service.AddPerson(person);
                return Ok();
            }

            return BadRequest();
        }
    }
}