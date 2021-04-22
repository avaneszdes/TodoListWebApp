using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;

namespace Services.AdminServiceCommands.Commands.AddUser
{
    public class AddUserCommandHandler : AsyncRequestHandler<AddUserCommand>
    {
        private readonly IUserRepository _userRepository;
        private readonly IRoleRepository _roleRepository;

        public AddUserCommandHandler(IUserRepository userRepository,IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
            _userRepository = userRepository;
        }

        protected override async Task Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var role = _roleRepository.GetRoles().Result.First(x => x.Name == "user");
            await _userRepository.AddUserAsync(new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Role = role,
                Id = request.Id,
                Password = request.Password
            });
        }
    }
}