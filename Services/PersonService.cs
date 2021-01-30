using System.Collections.Generic;
using Entities;
using Repositories;

namespace Services
{
    public class PersonService: IPersonService
    {
        private readonly IPersonRepository _repository; 
        public PersonService(IPersonRepository repository)
        {
            _repository = repository;
        }
        
        public List<Person> GetAll()
        {
            return _repository.GetAll();
        }

        public void AddPerson(Person person)
        {
            _repository.AddPerson(person);
        }
    }
}