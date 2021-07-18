using System.Linq;

namespace Services
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> GetPage<T>(this IQueryable<T> query, int offset, int limit) where T : class
        {
            return query
                .Skip(offset)
                .Take(limit);
        }
    }
}   