using MediatR;

namespace Services.UserServiceCommands.Queries
{
    public class GetUserPhotoQuery : IRequest<string>
    {
        public GetUserPhotoQuery(long id)
        {
            Id = id;
        }

        public long Id { get; }
    }
}