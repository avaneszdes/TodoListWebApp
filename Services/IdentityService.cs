using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace Services
{
    public class IdentityService : IIdentityService
    {
        private readonly HttpContextAccessor _accessor;

        public IdentityService(HttpContextAccessor accessor)
        {
            _accessor = accessor;
           
        }
        
        public int GetTokenId()
        {
            var claimsMap = _accessor.HttpContext.User.Claims
                .ToDictionary(x => x.Type, x => x.Value);

            return claimsMap.ContainsKey(ClaimTypes.Name) ? int.Parse(claimsMap[ClaimTypes.Name]) : default;
        }
    }
}