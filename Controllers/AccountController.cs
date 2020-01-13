using System;
using System.Threading.Tasks;
using AutoService.Auth;
using AutoService.DataBase;
using AutoService.Models.AuthModels;
using AutoService.Models.IdentityModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace AutoService.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AccountController : Controller
    {
        private readonly AuthService _authService;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _authService = new AuthService(userManager, signInManager);
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> SignUp([FromBody] SignUpModel signUpData)
        {
            if (ModelState.IsValid == false)
                return BadRequest("Wrong SingUp data format!");
            
            try
            {
                string encodedJwt = await _authService.SingUpNewUser(signUpData);
                
                var response = new
                {
                    access_token = encodedJwt,
                    usermail = signUpData.Email
                };
                    
                return Json(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
        
        [HttpPost]
        [AllowAnonymous]
        public IActionResult LogIn([FromBody] LogInModel userInfo)
        {
            User userModel = new UsersTable().GetUser(userInfo.Login, userInfo.Password);
            
            if (userModel == null)
                return BadRequest(new { errorText = "Invalid username or password." });

            string encodedJwt = _authService.AuthorizationUser(userModel);

            if (string.IsNullOrEmpty(encodedJwt))
                return StatusCode(500, "Can't generate auth token!");
 
            var response = new
            {
                access_token = encodedJwt,
                usermail = userModel.Email
            };
            
            return Json(response);
        }
        

        
        [HttpGet, Authorize(Roles = "admin")]
        //[AllowAnonymous]
        public IActionResult GetRole()
        {
            return Ok("Ваша роль: администратор");
        }      
        
    }
}