using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Entities;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using Repositories;
using Services;
using Services.TodoItemDto;

namespace Tests.UnitTests
{
    [TestClass]
    public class TodoListTest
    {
        [TestMethod]
        public void TodoItemIsAdded()
        {
            var todoItem = new TodoItem {Id = 1, Text = "123", IsComplete = false, UserId = 3};
            
            var mockRepository = new Mock<ITodoListRepository>();
            var mapper = new Mock<IMapper>();
            var httpContext = new Mock<IIdentityService>();
            var mockService = new TodoListService(mockRepository.Object, httpContext.Object, mapper.Object);
            mockService.AddItem(todoItem);
            
            mockRepository.Verify(v => v.AddItem(It.IsAny<TodoItem>()));
        }
        
        [TestMethod]
        public void TodoItemIsDeleted()
        {
            var itemId = 1;
            
            var mockRepository = new Mock<ITodoListRepository>();
            var mapper = new Mock<IMapper>();
            var httpContext = new Mock<IIdentityService>();
            var mockService = new TodoListService(mockRepository.Object, httpContext.Object, mapper.Object);
            mockService.RemoveItem(itemId);
            
            mockRepository.Verify(v => v.RemoveItem(It.IsAny<int>()));
        }
        
        
        [TestMethod]
        public void TodoItemIsUpdated()
        {
            var todoItem = new TodoItem {Id = 1, Text = "123", IsComplete = false, UserId = 3};
            
            var mockRepository = new Mock<ITodoListRepository>();
            var mapper = new Mock<IMapper>();
            var httpContext = new Mock<IIdentityService>();
            var mockService = new TodoListService(mockRepository.Object, httpContext.Object, mapper.Object);
            mockService.UpdateItem(todoItem.Id, todoItem.Text, todoItem.IsComplete);
            
            mockRepository.Verify(v => v.UpdateItem(It.IsAny<TodoItem>()));
        }

        
        
        [TestMethod]
        public void GetTodoItems_PaginationItems()
        {
            var repository = new Mock<ITodoListRepository>();
            var mapperCfg = new MapperConfiguration(m =>
            {
                m.AddMaps(typeof(TodoItemDtoModel).Assembly);
            });
            
            var mapper = mapperCfg.CreateMapper();
            var httpContext = new Mock<IIdentityService>();
            httpContext.Setup(x => x.GetUserId()).Returns(1);
            
            var service = new TodoListService(repository.Object, httpContext.Object, mapper);
            var list = new List<TodoItem>()
            {
                new TodoItem {Id = 1, Text = "1", IsComplete = false, UserId = 1},
                new TodoItem {Id = 2, Text = "2", IsComplete = false, UserId = 1},
                new TodoItem {Id = 5, Text = "2", IsComplete = false, UserId = 1},
            };
            repository.Setup(repo => repo.GetAll()).Returns(list.AsQueryable());
            
            Assert.IsTrue(list.Count == service.GetAll(0).Count);
            Assert.AreEqual(list.FirstOrDefault().Text, service.GetAll(0).FirstOrDefault().Text);
            Assert.IsFalse(list.FirstOrDefault().Text == service.GetAll(0)[1].Text);
            repository.Verify(x => x.GetAll());
        
        }
    }
}