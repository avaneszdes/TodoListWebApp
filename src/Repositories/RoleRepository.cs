using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;

namespace Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly AppDbContext _db;
        public RoleRepository(AppDbContext db)
        {
            _db = db;
        }
        
        public async Task<List<Role>> GetRoles()
        {
            return await _db.Roles.ToListAsync();
        }
    }
}