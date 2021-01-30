using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;

namespace Repositories
{
    public class PersonRepository: IPersonRepository
    {
        private readonly AppDbContext _dbContext;

        public PersonRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        
        public List<Person> GetAll( ) => _dbContext.Persons.ToList();
        public void AddPerson(Person person)
        {
            _dbContext.Persons.Add(person);
            _dbContext.SaveChanges();
        }
    }
}