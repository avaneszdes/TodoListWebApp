using System.Collections.Generic;
using MediatR;
using Services.DtoModels.UsersDto;

namespace Services.AdminServiceCommands.GetAllUsers
{
    public class GetAllUsersQuery: IRequest<List<UserDtoModel>>
    {
        
    }
}