using Entities;
using MediatR;

namespace Services.AdminServiceCommands.UpdateUser
{
    public class UpdateUserCommand : IRequest
    {
        public long Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
        public string Photo { get; set; }
    }
}