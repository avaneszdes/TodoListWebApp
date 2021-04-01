using System.Collections.Generic;
using System.Linq;
using Entities;

namespace Repositories
{
    public interface IRegistrationRepository
    {
        IQueryable<User> GetAll();
        void AddUser(User user);

    }
}