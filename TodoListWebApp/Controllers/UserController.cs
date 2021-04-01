using System.Linq;
using System.Text;
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
        private readonly IRoleService _roleService;
        public UserController(IAdminService service, IRoleService roleService)
        {
            _service = service;
            _roleService = roleService;
        }
        
        [HttpPut]
        public IActionResult UpdateUser([FromBody] UserDtoModel user)
        {
            var role = _roleService.GetRole().FirstOrDefault(x => x.Name == user.Role);
            var updatedUser = new User
            {
                Id = user.Id, 
                Email = user.Email, 
                Password = user.Password, 
                Role = role,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Photo =  user.Photo,
            };
            _service.UpdateUserData(updatedUser);
            return Ok();
        }
        
        [HttpGet("{id}")]
        public string GetUserPhoto(int id)
        {
            var a = _service.GetUserPhoto(id);
            return _service.GetUserPhoto(id);
        }
    }
}