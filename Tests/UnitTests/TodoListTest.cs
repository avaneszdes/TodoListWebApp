// using System.Collections.Generic;
// using Entities;
// using Microsoft.AspNetCore.Http;
// using Microsoft.VisualStudio.TestTools.UnitTesting;
// using Moq;
// using Repositories;
// using Services;
//
// namespace Tests.UnitTests
// {
//     [TestClass]
//     public class TodoListTest
//     {
//         [TestMethod]
//         public void TodoItemIsAdded()
//         {
//             var todoItem = new TodoItem {Id = 1, Text = "123", Finished = false, PersonId = 3};
//
//             var mockService = new Mock<TodoListService>();
//             mockService.Setup(x => x.AddItem(todoItem));
//
//             var mockRepository = new Mock<TodoListRepository>(mockService.Object);
//
//             mockRepository.Object.AddItem(todoItem);
//
//             mockRepository.VerifyAll();
//         }
//
//
//         [TestMethod]
//         public void GetTodoList()
//         {
//             var todoListItems = new List<TodoItem>
//             {
//                 new TodoItem {Id = 1, Text = "123", Finished = false, PersonId = 3},
//                 new TodoItem {Id = 2, Text = "1233", Finished = false, PersonId = 4},
//                 new TodoItem {Id = 6, Text = "12343", Finished = false, PersonId = 6},
//             };
//
//             var mockRepository = new Mock<ITodoListRepository>();
//             mockRepository.Setup(x => x.GetAll()).Returns(todoListItems);
//
//             var service = new TodoListService(mockRepository.Object, new IdentityService(new HttpContextAccessor()));
//             
//             Assert.AreEqual(todoListItems, service.GetAll());
//
//
//
//
//         }
//     }
// }