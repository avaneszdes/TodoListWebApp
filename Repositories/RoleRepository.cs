using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;

namespace Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _db;
        public RoleRepository(AppDbContext db)
        {
            _db = db;
        }
        
        public List<Role> GetRoles()
        {
            return _db.Roles.ToList();
        }
    }
}