using System;
using System.Linq;
using System.Threading.Tasks;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _db;

        public UserRepository(AppDbContext db)
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
        
        public async Task RemoveConfirmationDataAsync(int userFormId)
        {
            var form = await _db.EmailConfirmators.FirstOrDefaultAsync(x => x.Id == userFormId);
            if (form == null) return;
            _db.EmailConfirmators.Remove(form);
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
                existUser.Password = user.Password;
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

        public async Task<Guid> AddUserEmailDataConfirmation(string email)
        {
            var emailConfirmation = new EmailConfirmData() {Email = email, GuidId = Guid.NewGuid()};
            _db.EmailConfirmators.Add(emailConfirmation);
            await _db.SaveChangesAsync();
            return emailConfirmation.GuidId;
        }
        
        public async Task<EmailConfirmData> GetConfirmationDataAsync(Guid guidId)
        {
            return await _db.EmailConfirmators.FirstOrDefaultAsync(x => x.GuidId == guidId);
        }
    }
}