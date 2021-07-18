using MediatR;

namespace Services.AdminServiceCommands.Commands.AddUser
{
    public class AddUserCommand : IRequest
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
    }
}