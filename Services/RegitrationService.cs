using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Entities;
using Repositories;
using Services.UsersDto;

namespace Services
{
    public class RegistrationService: IRegistrationService
    {
        private readonly IRegistrationRepository _registrationRepository; 
        private readonly IRoleRepository _roleRepository;
        private readonly IMapper _mapper;
        public RegistrationService(IRegistrationRepository registrationRepository, IRoleRepository roleRepository, IMapper mapper)
        {
            _mapper = mapper;
            _registrationRepository = registrationRepository;
            _roleRepository = roleRepository;
        }
        
        public List<UserDtoModel> GetAll()
        {
            return _registrationRepository.GetAll().ProjectTo<UserDtoModel>(_mapper.ConfigurationProvider).ToList();
        }

        public void AddUser(User user)
        {

            var role = _roleRepository.GetRoles().First(x => x.Name == "user");
            
            _registrationRepository.AddUser(new User
            {
                FirstName = user.FirstName,
                Email = user.Email, 
                Id = user.Id, 
                Password = user.Password,
                Role = role, 
                LastName = user.LastName,
            });
        }
    }
}