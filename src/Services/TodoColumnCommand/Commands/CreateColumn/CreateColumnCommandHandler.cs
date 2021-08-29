using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;

namespace Services.TodoColumnCommand.Commands.CreateColumn
{
    public class CreateColumnCommandHandler: IRequestHandler<CreateColumnCommand, long>
    {
        private readonly ITodoColumnRepository _repository;
        private readonly IIdentityService _identityService;
        
        public CreateColumnCommandHandler(ITodoColumnRepository repository, IIdentityService identityService)
        {
            _repository = repository;
            _identityService = identityService;
        }
        public async Task<long> Handle(CreateColumnCommand request, CancellationToken cancellationToken)
        {
          return await _repository.CreateColumnAsync(request.ColumnName, _identityService.GetUserId());
        }
    }
}