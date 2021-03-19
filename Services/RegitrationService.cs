using System.Collections.Generic;
using System.Linq;
using Entities;
using Repositories;

namespace Services
{
    public class RegistrationService: IRegistrationService
    {
        private readonly IRegistrationRepository _repository; 
        public RegistrationService(IRegistrationRepository repository)
        {
            _repository = repository;
        }
        
        public List<User> GetAll()
        {
            return _repository.GetAll();
        }

        public void AddUser(User user)
        {
            _repository.AddUser(new User
            {
                FirstName = user.FirstName,
                Email = user.Email, 
                Id = user.Id, 
                Password = user.Password,
                Role = "user", 
                LastName = user.LastName
            });
        }
    }
}