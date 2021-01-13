using System;
using System.Collections.Generic;
using System.Linq;
using ApplicationContext;
using Entities;

namespace Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        private AppDbContext _context;
        public TodoListRepository(AppDbContext context)
        {
            _context = context;
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
            _context.TodoItems.Remove(_context.TodoItems.Find(id));
            _context.SaveChanges();
        }

        public void UpdateItem(int id, string text, bool finished)
        {
            _context.TodoItems.Update(new TodoItem {Id = id, Finished = finished, Text = text});
            _context.SaveChanges();
        }
    }
}