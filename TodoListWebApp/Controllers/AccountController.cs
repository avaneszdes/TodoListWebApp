using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Services;

namespace TodoListWebApp.Controllers
{
    [Route("authorization")]
    public class AccountController : Controller
    {
        private readonly IPersonService _person;

        public AccountController(IPersonService person)
        {
            _person = person;
        }

        [HttpPost]
        public IActionResult Token([FromBody] Person person)
        {
            var identity = GetIdentity(person.Email, person.Password);

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

            var response = new
            {
                token = encodedJwt,
                username = identity.Name
            };

            return Json(response);
        }

        private ClaimsIdentity GetIdentity(string email, string password)
        {
            Person person = _person.GetAll().FirstOrDefault(x =>
                x.Email == email && x.Password == password);

            if (person != null)
            {
                var claims = new List<Claim>
                {   
                    new(ClaimsIdentity.DefaultNameClaimType, person.Email),
                    new(ClaimsIdentity.DefaultRoleClaimType, person.Password),
                    new(ClaimsIdentity.DefaultRoleClaimType, person.Id.ToString()),
                };
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);

                return claimsIdentity;
            }

            return null;
        }
    }
}