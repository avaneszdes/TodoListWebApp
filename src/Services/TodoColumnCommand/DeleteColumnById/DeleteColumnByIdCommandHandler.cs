using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;

namespace Services.TodoColumnCommand.DeleteColumnById
{
    public class DeleteColumnByIdCommandHandler: AsyncRequestHandler<DeleteColumnByIdCommand>
    {
        private readonly ITodoColumnRepository _columnRepository;
        private readonly IIdentityService _identity;
        public DeleteColumnByIdCommandHandler(ITodoColumnRepository columnRepository, IIdentityService identity)
        {
            _columnRepository = columnRepository;
            _identity = identity;
        }
        
        protected override async Task<bool> Handle(DeleteColumnByIdCommand request, CancellationToken cancellationToken)
        {
            return await _columnRepository.RemoveColumnAsync(request.ColumnId, _identity.GetUserId());
        }
    }
}