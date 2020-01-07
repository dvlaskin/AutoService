using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoService.Auth;
using AutoService.Models.AuthModels;
using AutoService.Models.IdentityModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace AutoService.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        // тестовые данные вместо использования базы данных
        private List<User> people = new List<User>
        {
            new User() { Login="admin@mail.com", Password="12345", Role = "admin" },
            new User() { Login="user@mail.com", Password="123", Role = "user" }
        };
        
        
        [HttpPost]
        [AllowAnonymous]
        public IActionResult Login([FromBody] LogInModel userInfo)
        {
            var identity = GetIdentity(userInfo.Login, userInfo.Password);
            if (identity == null)
            {
                return BadRequest(new { errorText = "Invalid username or password." });
            }
           
            var now = DateTime.UtcNow;
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
 
            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name
            };
 
            return Json(response);
        }
        
        
        private ClaimsIdentity GetIdentity(string login, string password)
        {
            User person = people.FirstOrDefault(x => x.Login == login && x.Password == password);
            
            if (person != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                };
                
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                
                return claimsIdentity;
            }
 
            // если пользователя не найдено
            return null;
        }
        
        [HttpGet, Authorize(Roles = "admin")]
        //[AllowAnonymous]
        public IActionResult GetRole()
        {
            return Ok("Ваша роль: администратор");
        }      
        
    }
}