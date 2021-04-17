using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Repositories;
using Services;
using Services.UsersDto;

namespace Tests.UnitTests
{
    [TestClass]
    public class AdminServiceTest
    {
        [TestMethod]
        public void GetUsersDto()
        {
            var mockRepository = new Mock<IAdminRepository>();
            var mapperCfg = new MapperConfiguration(m => { m.AddMaps(typeof(UserDtoModel).Assembly); });

            var maper = mapperCfg.CreateMapper();

            var users = new List<User>
            {
                new User
                {
                    Id = 1, Email = "", Password = "", FirstName = "", LastName = "", RoleId = 1,
                    TodoItems = new List<TodoItem>
                    {
                        new TodoItem {Id = 1, Text = "2", IsComplete = false},
                        new TodoItem {Id = 1, Text = "2", IsComplete = false}
                    }
                },
                new User
                {
                    Id = 1, Email = "", Password = "", FirstName = "", LastName = "", RoleId = 1,
                    TodoItems = new List<TodoItem>
                    {
                        new TodoItem {Id = 1, Text = "2", IsComplete = false},
                        new TodoItem {Id = 1, Text = "2", IsComplete = false}
                    }
                },
                new User
                {
                    Id = 1, Email = "", Password = "", FirstName = "", LastName = "", RoleId = 1,
                    TodoItems = new List<TodoItem>
                    {
                        new TodoItem {Id = 1, Text = "2", IsComplete = false},
                        new TodoItem {Id = 1, Text = "2", IsComplete = false}
                    }
                },
            };

            mockRepository.Setup(x => x.GetUsersAsync()).Returns(users.AsQueryable());
            var Servise = new AdminService(mockRepository.Object, maper);

            Assert.AreEqual(users.FirstOrDefault().FirstName, Servise.GetUsers().FirstOrDefault().FirstName);
            Assert.IsTrue(users.Count == Servise.GetUsers().Count);
            Assert.IsNotNull(Servise.GetUsers());
        }


        [TestMethod]
        public void DeleteUser_isDeleted()
        {
            var mockRepository = new Mock<IAdminRepository>();
            var mockMapper = new Mock<IMapper>();

            var service = new AdminService(mockRepository.Object, mockMapper.Object);
            service.RemoveUser(It.IsAny<int>());

            mockRepository.Verify(f => f.RemoveUserAsync(It.IsAny<int>()));
        }


        [TestMethod]
        public void UpdateUserData_isUpdated()
        {
            var mockRepository = new Mock<IAdminRepository>();
            var mockMapper = new Mock<IMapper>();

            var service = new AdminService(mockRepository.Object, mockMapper.Object);
            service.UpdateUserData(It.IsAny<User>());

            mockRepository.Verify(f => f.UpdateUserData(It.IsAny<User>()));
        }

   }
}