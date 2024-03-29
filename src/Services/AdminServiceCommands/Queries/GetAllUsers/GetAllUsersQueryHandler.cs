using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Services.DtoModels.UsersDto;

namespace Services.AdminServiceCommands.Queries.GetAllUsers
{
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, List<UserDtoModel>>
    {
        private readonly IUserRepository _repository;
        private readonly IMapper _mapper;
        
        public GetAllUsersQueryHandler(IUserRepository repository, IMapper mapper)
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