using Entities;
using FluentValidation;

namespace Services
{
    public class PersonValidator: AbstractValidator<User>
    {
        public PersonValidator()
        {
            RuleFor(customer => customer.Email).NotNull().EmailAddress().MaximumLength(50);
            RuleFor(customer => customer.FirstName).NotNull().MaximumLength(50);
            RuleFor(customer => customer.LastName).NotNull().MaximumLength(50);
            RuleFor(customer => customer.Password).NotNull().MinimumLength(8);
        }
    }
}