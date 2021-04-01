using System.Collections.Generic;
using Entities;

namespace Repositories
{
    public interface IRoleRepository
    {
        List<Role> GetRoles();
    }
}