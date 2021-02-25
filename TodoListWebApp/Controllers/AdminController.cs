using System.Collections.Generic;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.UsersDto;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Authorize(Roles = "admin")]
    [Route("[controller]")]
    public class Admin : Controller
    {
        private readonly IAdminService _service;
        public Admin(IAdminService service)
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