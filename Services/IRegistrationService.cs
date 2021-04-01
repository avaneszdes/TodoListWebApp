using System.Collections.Generic;
using Entities;
using Services.UsersDto;

namespace Services
{
    public interface IRegistrationService
    {
        List<UserDtoModel> GetAll();
        void AddUser(User user);
    }
}