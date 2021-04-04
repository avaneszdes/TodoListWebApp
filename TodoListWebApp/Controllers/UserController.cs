using System.Linq;
using System.Net.Http;
using System.Text;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Services;
using Services.EmailDto;
using Services.UsersDto;

namespace TodoListWebApp.Controllers
{
    [ApiController]
    [Route("api/user")]
    public class UserController: Controller
    {
        private readonly IAdminService _service;
        private readonly IRoleService _roleService;
        private readonly EmailSender _emailSender;
        public UserController(IAdminService service, IRoleService roleService, EmailSender emailSender)
        {
            _service = service;
            _roleService = roleService;
            _emailSender = emailSender;
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
            return _service.GetUserPhoto(id);
        }
        
        
        [HttpPost]
        public IActionResult SendEmail([FromBody]Email email)
        {
            return Ok(_emailSender.SendEmailCustom(email));
        }
    }
}