//using System;
//using System.Collections.Generic;
//using System.Linq;
//using AutoMapper;
//using Entities;
//using MediatR;
//using Microsoft.VisualStudio.TestTools.UnitTesting;
//using Moq;
//using Repositories;
//using Services;
//using Services.AdminServiceCommands.Commands.RemoveUserById;
//using Services.AdminServiceCommands.GetAllUsers;
//using Services.UsersDto;

//namespace Tests.UnitTests
//{
//    [TestClass]
//    public class AdminServiceTest
//    {
//        [TestMethod]
//        public async void GetUsersDto()
//        {
//            var mockRepository = new Mock<IUserRepository>();
//            var mapperCfg = new MapperConfiguration(m => { m.AddMaps(typeof(UserDtoModel).Assembly); });

//            var mediatr = new Mock<IMediator>();
            
//            var mapper = mapperCfg.CreateMapper();

//            var users = new List<User>
//            {
//                new User
//                {
//                    Id = 1, Email = "", Password = "", FirstName = "", LastName = "", RoleId = 1,
//                    TodoItems = new List<TodoItem>
//                    {
//                        new TodoItem {Id = 1, Text = "2", IsComplete = false},
//                        new TodoItem {Id = 1, Text = "2", IsComplete = false}
//                    }
//                },
//                new User
//                {
//                    Id = 1, Email = "", Password = "", FirstName = "", LastName = "", RoleId = 1,
//                    TodoItems = new List<TodoItem>
//                    {
//                        new TodoItem {Id = 1, Text = "2", IsComplete = false},
//                        new TodoItem {Id = 1, Text = "2", IsComplete = false}
//                    }
//                },
//                new User
//                {
//                    Id = 1, Email = "", Password = "", FirstName = "", LastName = "", RoleId = 1,
//                    TodoItems = new List<TodoItem>
//                    {
//                        new TodoItem {Id = 1, Text = "2", IsComplete = false},
//                        new TodoItem {Id = 1, Text = "2", IsComplete = false}
//                    }
//                },
//            };

//            mockRepository.Setup(x => x.GetUsersAsync()).Returns(users.AsQueryable());
//            var query = new GetAllUsersQuery();
//            var handler = new GetAllUsersQueryHandler(mockRepository.Object, mapper);

//            var actual = await handler.Handle(query, new System.Threading.CancellationToken());

//            Assert.AreEqual(users.FirstOrDefault(x => x.FirstName != string.Empty), actual.FirstOrDefault()?.FirstName);
//            Assert.IsTrue(users.Count == actual.Count);
//            Assert.IsNotNull(actual);
//        }


//        [TestMethod]
//        public async void DeleteUser_isDeleted()
//        {
//            var mockRepository = new Mock<IUserRepository>();
//            var mediatr = new Mock<IMediator>();
//            var userId = 2;
//            await mediatr.Object.Send(new RemoveUserByIdCommand(userId));

//            mockRepository.Verify(f => f.RemoveUserAsync(userId));
//        }


//        [TestMethod]
//        public void UpdateUserData_isUpdated()
//        {
//            var mockRepository = new Mock<IUserRepository>();
        
//            var service = new AdminService(mockRepository.Object, mockMapper.Object);
//            service.UpdateUserData(It.IsAny<User>());
        
//            mockRepository.Verify(f => f.UpdateUserData(It.IsAny<User>()));
//        }

//   }
//}