using System;
using MediatR;

namespace Services.UserServiceCommands.Commands.UpdateUserPassword
{
    public class UpdateEmailCommand: IRequest<string>
    {
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public string GuidId { get; set; }
    }
}