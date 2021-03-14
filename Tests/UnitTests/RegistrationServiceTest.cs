using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Repositories;
using Services;

namespace Tests.UnitTests
{
    [TestClass]
    public class RegistrationServiceTest
    {
        [TestMethod]
        public void GetAllUsers_isResponseUsers()
        {
            var users = new List<User>
            {
                new User {Id = 1, Email = "", Password = "", FirstName = "", LastName = ""},
                new User {Id = 2, Email = "", Password = "", FirstName = "", LastName = ""}
            };

            var mockRepository = new Mock<IRegistrationRepository>();
            mockRepository.Setup(x => x.GetAll()).Returns(users);
            var service = new RegistrationService(mockRepository.Object);
            
            Assert.IsTrue(users.Count == service.GetAll().Count);
            Assert.AreNotEqual(new List<User>(), service.GetAll().Count);
            Assert.AreEqual(users.FirstOrDefault().FirstName, service.GetAll().FirstOrDefault().FirstName);
        }


        [TestMethod]
        public void AddUserToDb_isAdded()
        {
            var user = new User {Id = 12, Email = "", Password = "", FirstName = ""};
            
            var mockRepository = new Mock<IRegistrationRepository>();
            var mockService = new RegistrationService(mockRepository.Object);
            mockService.AddUser(user);
            
            mockRepository.Verify(x => x.AddUser(It.IsAny<User>()));
        }
    }
}