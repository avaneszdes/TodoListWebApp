using System.Collections.Generic;
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
        public AdminController(IAdminService service)
        {
            _service = service;
        }
        
        [HttpGet]
        public List<UserDtoModel> GetUsers()
        {
            return _service.GetUsers();
        }
        
        
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            _service.RemoveUser(id);
            return Ok();
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
                LastName = user.LastName
            };
            _service.UpdateUserData(updatedUser);

            return Ok();
        }
       
    }
}