using System.Collections.Generic;
using Entities;

namespace Services
{
    public interface IPersonService
    {
        List<Person> GetAll();
        void AddPerson(Person person);
    }
}