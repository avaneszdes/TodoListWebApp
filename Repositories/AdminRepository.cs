using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private AppDbContext _db;

        public AdminRepository(AppDbContext db)
        {
            _db = db;
        }

        public IQueryable<User> GetUsers()
        {
            return _db.Users;
        }

        public void RemoveUser(int id)
        {
            User user = _db.Users.Find(id);

            if (user != null)
            {
                _db.Users.Remove(user);
                _db.SaveChanges();
            }
        }

        public void UpdateUserData(User user)
        {
            User existUser = _db.Users.Find(user.Id);
            
            if (existUser != null && user.Email != null)
            {
                _db.Attach(existUser);
                existUser.Email = user.Email;
                existUser.Photo = user.Photo;
                existUser.Password = user.Password;
                existUser.Role = user.Role;
                existUser.FirstName = user.FirstName;
                existUser.LastName = user.LastName;
                _db.SaveChanges();
            }

            _db.Attach(existUser);
            existUser.Photo = user.Photo;
            _db.SaveChanges();

        }
    }
}