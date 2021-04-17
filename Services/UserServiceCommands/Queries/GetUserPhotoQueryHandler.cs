using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;
using Services.UserServiceCommands.Queries;

namespace Services.UserServiceCommands
{
    public class GetUserPhotoQueryHandler : IRequestHandler<GetUserPhotoQuery, string>
    {
        private readonly IAdminRepository _adminRepository;
        public GetUserPhotoQueryHandler(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }
        public async Task<string> Handle(GetUserPhotoQuery request, CancellationToken cancellationToken)
        {
            return await _adminRepository.GetUserPhotoAsync(request.Id);;
        }
    }
}