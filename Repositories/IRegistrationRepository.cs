using System.Collections.Generic;
using Entities;

namespace Repositories
{
    public interface IRegistrationRepository
    {
        List<User> GetAll();
        void AddUser(User user);

    }
}