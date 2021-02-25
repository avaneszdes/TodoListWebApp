using System.Collections.Generic;
using Entities;
using Repositories;

namespace Services
{
    public class PersonService: IPersonService
    {
        private readonly IUserRepository _repository; 
        public PersonService(IUserRepository repository)
        {
            _repository = repository;
        }
        
        public List<User> GetAll()
        {
            return _repository.GetAll();
        }

        public void AddPerson(User user)
        {
            _repository.AddPerson(user);
        }
    }
}