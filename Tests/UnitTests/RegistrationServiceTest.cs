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
            var mockRole = new Mock<IRoleRepository>();
            var mapper = new Mock<IMapper>();
            
            mockRepository.Setup(x => x.GetAll()).Returns(users.AsQueryable);
            var service = new RegistrationService(mockRepository.Object, mockRole.Object, mapper.Object);
            
            Assert.IsTrue(users.Count == service.GetAll().Count);
            Assert.AreNotEqual(new List<User>(), service.GetAll().Count);
            Assert.AreEqual(users.FirstOrDefault().FirstName, service.GetAll().FirstOrDefault().FirstName);
        }


        [TestMethod]
        public void AddUserToDb_isAdded()
        {
            var user = new User {Id = 12, Email = "", Password = "", FirstName = ""};
            var mapper = new Mock<IMapper>();
            
            var mockRole = new Mock<IRoleRepository>();
            var mockRepository = new Mock<IRegistrationRepository>();
            var mockService = new RegistrationService(mockRepository.Object, mockRole.Object, mapper.Object);
            mockService.AddUser(user);
            
            mockRepository.Verify(x => x.AddUser(It.IsAny<User>()));
        }
    }
}