using System.Collections.Generic;
using Entities;
using Repositories;

namespace Services
{
    public class RoleService :IRoleService
    {
        private IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        
        public List<Role> GetRole()
        {
           return _roleRepository.GetRoles();
        }
    }
}