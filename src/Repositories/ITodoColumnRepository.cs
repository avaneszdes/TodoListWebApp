using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;

namespace Repositories
{
    public interface ITodoColumnRepository
    {
        Task<TodoColumn> GetColumnAsync(long columnId, long userId);
        Task<bool> IsColumnExistAsync(long columnId);
        Task<long> CreateColumnAsync(string columnName,long userId);
        Task<int> GetColumnsCount(long userId);
        IQueryable<TodoColumn> GetAllColumns(long userId);
        Task UpdateColumn(TodoColumn column);
        Task<bool> RemoveColumnAsync(long id, long userId);
        
        
        
        
        
    }
}