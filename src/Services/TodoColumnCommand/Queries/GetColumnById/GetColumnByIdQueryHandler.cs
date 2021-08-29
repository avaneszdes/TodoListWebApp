using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Entities;
using MediatR;
using Repositories;

namespace Services.TodoColumnCommand.Queries.GetColumnById
{
    public class GetColumnByIdQueryHandler: IRequestHandler<GetColumnByIdQuery, TodoColumn>
    {
        private readonly ITodoColumnRepository _columnRepository;
        private readonly IIdentityService _identityService;
        
        public GetColumnByIdQueryHandler(ITodoColumnRepository columnRepository, IIdentityService identityService)
        {
            _columnRepository = columnRepository;
            _identityService = identityService;
        }

        public async Task<TodoColumn> Handle(GetColumnByIdQuery request, CancellationToken cancellationToken)
        {
            return await _columnRepository.GetColumnAsync(request.ColumnId, _identityService.GetUserId());
        }
    }
}