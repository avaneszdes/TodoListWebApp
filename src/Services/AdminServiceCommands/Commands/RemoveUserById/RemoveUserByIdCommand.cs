using MediatR;

namespace Services.AdminServiceCommands.Commands.RemoveUserById
{
    public class RemoveUserByIdCommand: IRequest
    {
        public RemoveUserByIdCommand(long id)
        {
            Id = id;
        }

        public long Id { get; }
    }
}