using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoService.DataBase;
using AutoService.Models.AuthModels;
using AutoService.Models.IdentityModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;


namespace AutoService.Auth
{
    public class AuthService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }
      
        /// <summary>
        /// Registration new user
        /// </summary>
        /// <param name="signUpModel"></param>
        public async Task<string> SingUpNewUser(SignUpModel signUpModel)
        {
            string jwtCode = "";
            
            User user = new User()
            {
                Email = signUpModel.Email,
                UserName = GetUserNameFormEmail(signUpModel.Email)
            };

            IdentityResult result = await _userManager.CreateAsync(user, signUpModel.Password);

            if (result.Succeeded)
            {
                //await _signInManager.SignInAsync(user, false);
                User userModel = new UsersTable().GetUser(signUpModel.Email, signUpModel.Password);
                if (userModel != null)
                    jwtCode = AuthorizationUser(userModel);
            }

            return jwtCode;
        }

        /// <summary>
        /// Authorization existing user
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        public string AuthorizationUser(User userModel)
        {
            string result = "";
            
            ClaimsIdentity identity = GetUserIdentity(userModel);
            
            if (identity != null)
            {
                DateTime now = DateTime.UtcNow;
                
                // создаем JWT-токен
                JwtSecurityToken jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: identity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
                );
                
                string encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                result = encodedJwt;
            }

            return result;
        }
        
        /// <summary>
        /// Get User Claims Identity
        /// </summary>
        /// <param name="userModel"></param>
        /// <returns></returns>
        private ClaimsIdentity GetUserIdentity(User userModel)
        {
            if (userModel != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, userModel.Email),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, userModel.Role),
                    new Claim("UserName", GetUserNameFormEmail(userModel.Email))
                };
                
                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                        ClaimsIdentity.DefaultRoleClaimType);
                
                return claimsIdentity;
            }
 
            // если пользователя не найдено
            return null;
        }

        /// <summary>
        /// Substing User Name from his Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private string GetUserNameFormEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                return "";
            
            return email.Substring(0, email.IndexOf('@'));
        }
    }
}