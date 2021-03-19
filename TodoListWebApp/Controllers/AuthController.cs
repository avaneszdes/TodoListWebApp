using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Json;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services;

namespace TodoListWebApp.Controllers
{
    [Route("authorization")]
    public class AccountController : Controller
    {
        private readonly IRegistrationService _person;

        public AccountController(IRegistrationService person)
        {
            _person = person;
        }

        [HttpPost]
        public IActionResult Token([FromBody] User user)
        {
            var identity = GetIdentity(user.Email, user.Password);

            if (identity == null)
            {
                return BadRequest(new {errorText = "Invalid username or password."});
            }

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: Auth.ISSUER,
                audience: Auth.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(Auth.LIFETIME)),
                signingCredentials: new SigningCredentials(Auth.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            return Json(encodedJwt);
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            User user = _person.GetAll().FirstOrDefault(x =>
                x.Email == email && x.Password == password);

            if (user != null)
            {
                var claims = new List<Claim>
                {
                    new("UserProfile", JsonSerializer.Serialize(user)),
                    new(ClaimsIdentity.DefaultRoleClaimType, user?.Role ),
                };

                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(new GenericIdentity(user.Id.ToString()), claims, "Token",
                        ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            return null;
        }
    }
}