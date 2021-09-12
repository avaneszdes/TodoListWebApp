using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Repositories;
using Services.DtoModels.TodoColumnDto;

namespace Services.TodoColumnCommand.Queries.GetAll
{
    public class GetAllColumnsQueryHandler: IRequestHandler<GetAllColumnsQuery, List<TodoColumnDto>>
    {
        private readonly ITodoColumnRepository _columnRepository;
        private readonly IIdentityService _identityService;
        private readonly IMapper _mapper;

        public GetAllColumnsQueryHandler(IIdentityService identityService, 
            ITodoColumnRepository columnRepository, IMapper mapper)
        {
            _identityService = identityService;
            _columnRepository = columnRepository;
            _mapper = mapper;
        }

        public async Task<List<TodoColumnDto>> Handle(GetAllColumnsQuery request, CancellationToken cancellationToken)
        {
           return await _columnRepository.GetAllColumns(_identityService.GetUserId())
                .OrderBy(x => x.Id)
                .ProjectTo<TodoColumnDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken: cancellationToken);
        }
    }
}