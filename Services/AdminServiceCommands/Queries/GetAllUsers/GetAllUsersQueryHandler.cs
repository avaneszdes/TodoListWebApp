using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Services.UsersDto;

namespace Services.AdminServiceCommands.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserDtoModel>>
    {
        private readonly IAdminRepository _repository;
        private readonly IMapper _mapper;
        
        public GetAllUsersQueryHandler(IAdminRepository repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;
        }
        public async Task<List<UserDtoModel>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {
            return await _repository.GetUsersAsync()
                .ProjectTo<UserDtoModel>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);
        }
    }
}