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
        private readonly IAdminRepository _adminRepository;
        private readonly IRoleRepository _roleRepository;

        public AddUserCommandHandler(IAdminRepository adminRepository,IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
            _adminRepository = adminRepository;
        }

        protected override async Task Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var role = _roleRepository.GetRoles().Result.First(x => x.Name == "user");
            await _adminRepository.AddUserAsync(new User()
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