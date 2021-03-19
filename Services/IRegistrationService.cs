using System.Collections.Generic;
using Entities;

namespace Services
{
    public interface IRegistrationService
    {
        List<User> GetAll();
        void AddUser(User user);
    }
}