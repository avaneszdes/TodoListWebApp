using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using ApplicationContext;
using Entities;
using Microsoft.AspNetCore.Http;

namespace Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        private AppDbContext _context;
        private readonly IHttpContextAccessor _accessor;
        
        public TodoListRepository(AppDbContext context,IHttpContextAccessor accessor)
        {
            _context = context;
            _accessor = accessor;
        }

        public List<TodoItem> GetAll()
        {
            return _context.TodoItems.ToList();
        }

        public void AddItem(TodoItem todoItem)
        {
           
            _context.Add(todoItem);
            _context.SaveChanges();
        }

        public void RemoveItem(int id)
        {
            var item = _context.TodoItems.Find(id);
            _context.TodoItems.Remove(item);
            _context.SaveChanges();
        }

        public void UpdateItem(TodoItem todoItem)
        {
            _context.TodoItems.Update(todoItem);
            _context.SaveChanges();
        }
    }
}