using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class RegistrationRepository : IRegistrationRepository
    {
        private readonly AppDbContext _dbContext;

        public RegistrationRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IQueryable<User> GetAll()
        {
            return _dbContext.Users.Include(x => x.Role);  
        } 

        public void AddUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }
    }
}