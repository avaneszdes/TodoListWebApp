using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly AppDbContext _db;

        public AdminRepository(AppDbContext db)
        {
            _db = db;
        }

        public IQueryable<User> GetUsersAsync()
        {
            return _db.Users.Include(x => x.Role);
        }

        public async Task RemoveUserAsync(long id)
        {
            var user = await _db.Users.FindAsync(id);
            if (user == null) return;
            _db.Users.Remove(user);
            await _db.SaveChangesAsync();
        }

        public async Task UpdateUserDataAsync(User user)
        {
            var existUser = await _db.Users.FindAsync(user.Id);

            if (existUser != null && user.Email != null)
            {
                existUser.Email = user.Email;
                existUser.Role = user.Role;
                existUser.FirstName = user.FirstName;
                existUser.LastName = user.LastName;
                _db.Update(existUser);
                await _db.SaveChangesAsync();
                return;
            }

            existUser.Photo = user.Photo;
            _db.Update(existUser);
            await _db.SaveChangesAsync();
        }

        public async Task<string> GetUserPhotoAsync(long id)
        {
            var user = await _db.Users.FindAsync(id);
            return user != null ? user.Photo : "";
        }

        public async Task AddUserAsync(User user)
        {
            await _db.Users.AddAsync(user);
            await _db.SaveChangesAsync();
        }
    }
}