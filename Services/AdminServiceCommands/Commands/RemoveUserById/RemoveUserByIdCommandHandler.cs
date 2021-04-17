using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Repositories;

namespace Services.AdminServiceCommands.Commands.RemoveUserById
{
    public class RemoveUserByIdCommandHandler : AsyncRequestHandler<RemoveUserByIdCommand>
    {
        private readonly IAdminRepository _repository;

        public RemoveUserByIdCommandHandler(IAdminRepository repository)
        {
            _repository = repository;
        }

        protected override async Task Handle(RemoveUserByIdCommand request, CancellationToken cancellationToken)
        {
            await _repository.RemoveUserAsync(request.Id);
        }
    }
}