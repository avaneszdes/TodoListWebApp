using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Entities
{
    public class Auth
    {
        public const string ISSUER = "MyAuthServer";
        public const string AUDIENCE = "MyAuthClient";
        const string KEY = "Avanesov-Vladi+!";
        public const int LIFETIME = 5;

        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}