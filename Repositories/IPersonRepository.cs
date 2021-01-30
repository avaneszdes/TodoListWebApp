using System.Collections.Generic;
using Entities;

namespace Repositories
{
    public interface IPersonRepository
    {
        List<Person> GetAll();
        void AddPerson(Person person);

    }
}