using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;

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
            var existUser = _db.Users.Find(user.Id);

            if (existUser != null)
            {
                existUser.Photo = user.Photo;
                _db.Users.Update(existUser);
                _db.SaveChanges();
            }
           
        }
    }
}