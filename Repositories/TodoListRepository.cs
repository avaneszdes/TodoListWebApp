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

        public TodoListRepository(AppDbContext context)
        {
            _context = context;
        }

        public IQueryable<TodoItem> GetAll()
        {
            return _context.TodoItems;
        }

        public void AddItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            _context.SaveChanges();
        }

        public void RemoveItem(long id)
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