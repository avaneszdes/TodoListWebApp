﻿using System.Collections.Generic;
using Entities;

namespace Services
{
    public interface IPersonService
    {
        List<User> GetAll();
        void AddPerson(User user);
    }
}