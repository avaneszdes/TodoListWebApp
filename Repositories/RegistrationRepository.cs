using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;

namespace Repositories
{
    public class RegistrationRepository : IRegistrationRepository
    {
        private readonly AppDbContext _dbContext;

        public RegistrationRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<User> GetAll() => _dbContext.Users.ToList();

        public void AddUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }
    }
}