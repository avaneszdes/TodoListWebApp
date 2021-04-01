using System.Collections.Generic;
using System.Linq;
using Entities;

namespace Repositories
{
    public interface IAdminRepository
    {
        IQueryable<User> GetUsers();
        void RemoveUser(long id);
        void UpdateUserData(User user);
        string GetUserPhoto(long id);
    }
}