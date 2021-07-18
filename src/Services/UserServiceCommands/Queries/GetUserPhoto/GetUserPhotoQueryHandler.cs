using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;
using Services.UserServiceCommands.Queries;

namespace Services.UserServiceCommands
{
    public class GetUserPhotoQueryHandler : IRequestHandler<GetUserPhotoQuery, string>
    {
        private readonly IUserRepository _userRepository;
        public GetUserPhotoQueryHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<string> Handle(GetUserPhotoQuery request, CancellationToken cancellationToken)
        {
            return await _userRepository.GetUserPhotoAsync(request.Id);;
        }
    }
}