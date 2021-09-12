using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ApplicationContext;
using Entities;
using Microsoft.AspNetCore.Http;

namespace Repositories
{
    public class TodoListRepository : ITodoListRepository
    {
        private readonly AppDbContext _context;

        public TodoListRepository(AppDbContext context)
        {
            _context = context;
        }

        public IQueryable<TodoItem> GetAll()
        {
            return _context.TodoItems;
        }

        public async Task AddItemAsync(TodoItem todoItem)
        {
            await _context.TodoItems.AddAsync(todoItem);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveItemAsync(long id)
        {
            var item = await _context.TodoItems.FindAsync(id);
            _context.TodoItems.Remove(item);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateItemAsync(TodoItem todoItem)
        {
            _context.TodoItems.Update(todoItem);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateItemsAsync(List<TodoItem> todoItems)
        {
            _context.TodoItems.UpdateRange(todoItems);
            await _context.SaveChangesAsync();
        }
    }
}