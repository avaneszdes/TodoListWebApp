using System.Linq;
using System.Threading.Tasks;
using Entities;

namespace Repositories
{
    public interface ITodoListRepository
    {
        IQueryable<TodoItem> GetAll();
        Task AddItemAsync(TodoItem todoItem);
        Task RemoveItemAsync(long id);
        Task UpdateItemAsync(TodoItem todoItem);
    }
}