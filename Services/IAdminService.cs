using System.Collections.Generic;
using Entities;
using Services.UsersDto;

namespace Services
{
    public interface IAdminService
    {
        List<UserDtoModel> GetUsers();
        void RemoveUser(long id);
        void UpdateUserData(User user);
        string GetUserPhoto(long id);
    }
}