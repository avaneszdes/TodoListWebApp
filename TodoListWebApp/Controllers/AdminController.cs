using System.Collections.Generic;
using System.Linq;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.UsersDto;

namespace TodoListWebApp.Controllers
{
    
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "admin")]
    public class AdminController : Controller
    {
        private readonly IAdminService _service;
        private readonly IRoleService _roleService;
        public AdminController(IAdminService service, IRoleService roleService)
        {
            _service = service;
            _roleService = roleService;
        }
        
        [HttpGet]
        public List<UserDtoModel> GetUsers()
        {
            return _service.GetUsers();
        }
        
        
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(long id)
        {
            _service.RemoveUser(id);
            return Ok();
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
       
    }
}