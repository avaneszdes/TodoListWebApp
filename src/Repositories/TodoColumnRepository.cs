using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ApplicationContext;
using Entities;
using Microsoft.EntityFrameworkCore;


namespace Repositories
{
    public class TodoColumnRepository : ITodoColumnRepository
    {
        private readonly AppDbContext _context;

        public TodoColumnRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<TodoColumn> GetColumnAsync(long columnId, long userId)
        {
            var columnName = await _context.TodoColumns.FirstAsync(x => x.Id == columnId);
            var todoItems = await _context.Set<TodoColumn>()
                .Where(x => x.Id == columnId)
                .Where(x => x.UserId == userId)
                .Select(x => x.TodoItems
                    .Select(t => new TodoItem
                    {
                        Text = t.Text,
                        Id = t.Id,
                        CreatedDate = t.CreatedDate,
                        IsComplete = t.IsComplete
                    }))
                .FirstOrDefaultAsync();


            var column = new TodoColumn()
            {
                ColumnName = columnName.ColumnName,
                TodoItems = todoItems.ToList(),
                Id = columnId
            };

            return column;
        }

        public async Task<bool> IsColumnExistAsync(long columnId)
        {
            return await _context.TodoColumns.FindAsync(columnId) == null;
        }

        public async Task<long> CreateColumnAsync(string columnName, long userId)
        {
            var column = new TodoColumn()
            {
                ColumnName = columnName,
                TodoItems = new List<TodoItem>(),
                UserId = userId
            };
            await _context.TodoColumns.AddAsync(column);
            await _context.SaveChangesAsync();

            return column.Id;
        }

        public Task<int> GetColumnsCount(long userId)
        {
            return Task.FromResult(_context.TodoColumns.Select(x => x.UserId).Count());
        }

        public IQueryable<TodoColumn> GetAllColumns(long userId)
        {
            return _context.TodoColumns.Where(x => x.UserId == userId);
        }

        public async Task UpdateColumn(TodoColumn column)
        {
            _context.Update(column);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> RemoveColumnAsync(long id, long userId)
        {
           var column = await _context.TodoColumns
               .Where(x => x.Id == id)
               .Where(x => x.UserId == userId)
               .FirstOrDefaultAsync();
           
           if (column is null)
           {
               return false;
           }

           _context.TodoColumns.Remove(column);
           await _context.SaveChangesAsync();

           return true;
        }
    }
}