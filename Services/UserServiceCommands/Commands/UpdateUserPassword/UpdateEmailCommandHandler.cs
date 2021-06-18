using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Repositories;

namespace Services.UserServiceCommands.Commands.UpdateUserPassword
{
    public class UpdateEmailCommandHandler: IRequestHandler<UpdateEmailCommand, string>
    {
        private readonly IUserRepository _repository;

        public UpdateEmailCommandHandler(IUserRepository repository)
        {
            _repository = repository;
        }
        
        public async Task<string> Handle(UpdateEmailCommand request, CancellationToken cancellationToken)
        {
            var userForm = await _repository.GetConfirmationDataAsync(Guid.Parse((ReadOnlySpan<char>) request.GuidId));
            var user = await _repository.GetUsersAsync().FirstOrDefaultAsync(x => x.Email == userForm.Email, cancellationToken: cancellationToken);
            var updatedUser = new User()
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Password = request.Password,
                Photo = user.Photo,
                Role = user.Role,
                Email = user.Email,
                Id = user.Id,
            };

            await _repository.UpdateUserDataAsync(updatedUser);
            await _repository.RemoveConfirmationDataAsync(userForm.Id);
            return "";
        }
    }
}