using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;

namespace Repositories
{
    public interface IAdminRepository
    {
        IQueryable<User> GetUsersAsync();
        Task RemoveUserAsync(long id);
        Task UpdateUserDataAsync(User user);
        Task<string> GetUserPhotoAsync(long id);
        Task AddUserAsync(User user);
    }
}