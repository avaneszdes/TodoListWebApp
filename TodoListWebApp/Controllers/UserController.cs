using Entities;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.UsersDto;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController: Controller
    {
        private readonly IAdminService _service;
        public UserController(IAdminService service)
        {
            _service = service;
            
        }
        
        [HttpPut]
        public IActionResult UpdateUser([FromBody] UserDtoModel user)
        {
            var updatedUser = new User
            {
                Id = user.Id, 
                Email = user.Email, 
                Password = user.Password, 
                Role = user.Role,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Photo =  user.Photo,
            };
            _service.UpdateUserData(updatedUser);

            return Ok();
        }
    }
}