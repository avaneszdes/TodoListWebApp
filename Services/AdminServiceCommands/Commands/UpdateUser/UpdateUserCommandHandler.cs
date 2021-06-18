using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;
using Services.AdminServiceCommands.UpdateUser;

namespace Services.AdminServiceCommands.Commands.UpdateUser
{
    public class UpdateUserCommandHandler : AsyncRequestHandler<UpdateUserCommand>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public UpdateUserCommandHandler(IRoleRepository roleRepository, IUserRepository repository)
        {
            _userRepository = repository;
            _roleRepository = roleRepository;
        }

        protected override async Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            request.Role ??= "user";
            var role = _roleRepository.GetRoles().Result.First(x => x.Name == request.Role);
            await _userRepository.UpdateUserDataAsync(new User()
            {
                Id = request.Id, 
                Email = request.Email,
                Photo = request.Photo,
                Role = role,
                FirstName = request.FirstName,
                LastName = request.LastName
            });
            
            
        }
    }
}