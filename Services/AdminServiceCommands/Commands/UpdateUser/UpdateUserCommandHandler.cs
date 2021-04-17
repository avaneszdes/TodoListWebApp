using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Entities;
using MediatR;
using Repositories;

namespace Services.AdminServiceCommands.UpdateUser
{
    public class UpdateUserCommandHandler : AsyncRequestHandler<UpdateUserCommand>
    {
        private readonly IAdminRepository _adminRepository;
        private readonly IRoleRepository _roleRepository;

        public UpdateUserCommandHandler(IRoleRepository roleRepository, IAdminRepository repository)
        {
            _adminRepository = repository;
            _roleRepository = roleRepository;
        }

        protected override async Task Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            request.Role ??= "user";
            var role = _roleRepository.GetRoles().Result.First(x => x.Name == request.Role);
            await _adminRepository.UpdateUserDataAsync(new User()
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