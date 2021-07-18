using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;

namespace Repositories
{
    public interface IRoleRepository
    {
        Task<List<Role>> GetRoles();
    }
}