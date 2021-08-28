using System.Collections.Generic;
using MediatR;
using Services.DtoModels.UsersDto;

namespace Services.AdminServiceCommands.Queries.GetAllUsers
{
    public class GetAllUsersQuery: IRequest<List<UserDtoModel>>
    {
        
    }
}