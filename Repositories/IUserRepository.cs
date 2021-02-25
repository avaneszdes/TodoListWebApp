using System.Collections.Generic;
using Entities;

namespace Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        void AddPerson(User user);

    }
}