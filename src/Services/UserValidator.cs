using Entities;
using FluentValidation;
using Services.AdminServiceCommands.Commands.AddUser;

namespace Services
{
    public class UserValidator: AbstractValidator<AddUserCommand>
    {
        public UserValidator()
        {
            RuleFor(customer => customer.Email).NotNull().EmailAddress().MaximumLength(50);
            RuleFor(customer => customer.FirstName).NotNull().MaximumLength(50);
            RuleFor(customer => customer.LastName).NotNull().MaximumLength(50);
            RuleFor(customer => customer.Password).NotNull().MinimumLength(8);
        }
    }
}