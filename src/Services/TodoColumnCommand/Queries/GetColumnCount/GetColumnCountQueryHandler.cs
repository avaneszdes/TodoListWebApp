using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;
using Services.AdminServiceCommands.Queries.GetAllUsers;

namespace Services.TodoColumnCommand.Queries.GetColumnCount
{
    public class GetColumnCountQueryHandler: IRequestHandler<GetColumnCountQuery, int>
    {
        private readonly ITodoColumnRepository _columnRepository;
        private readonly IIdentityService _identityService;
        
        public GetColumnCountQueryHandler(ITodoColumnRepository columnRepository, IIdentityService identityService)
        {
            _columnRepository = columnRepository;
            _identityService = identityService;
        }
        public Task<int> Handle(GetColumnCountQuery request, CancellationToken cancellationToken)
        {
            return _columnRepository.GetColumnsCount(_identityService.GetUserId());
        }
    }
}