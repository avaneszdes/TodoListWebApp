using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Entities;
using Repositories;
using Services.UsersDto;

namespace Services
{
    public class AdminService : IAdminService
    {
        private readonly IAdminRepository _repository;
        private IMapper _mapper;
        
        public AdminService(IAdminRepository repository,IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public List<UserDtoModel> GetUsers()
        {
            return _repository.GetUsers().ProjectTo<UserDtoModel>(_mapper.ConfigurationProvider).ToList();
        }

        public void RemoveUser(int id)
        {
            _repository.RemoveUser(id);
        }

        public void UpdateUserData(User user)
        {
            _repository.UpdateUserData(user);
        }
    }
}