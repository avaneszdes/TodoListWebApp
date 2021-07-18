using System;
using System.Linq;
using System.Threading.Tasks;
using Entities;

namespace Repositories
{
    public interface IUserRepository
    {
        IQueryable<User> GetUsersAsync();
        Task RemoveUserAsync(long id);
        Task UpdateUserDataAsync(User user);
        Task<string> GetUserPhotoAsync(long id);
        Task AddUserAsync(User user);
        Task<Guid> AddUserEmailDataConfirmation(string email);
        Task<EmailConfirmData> GetConfirmationDataAsync(Guid guidId);
        Task RemoveConfirmationDataAsync(int userFormId);
    }
}