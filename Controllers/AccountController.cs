using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AutoService.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    public class AccountController : Controller
    {
        
        [HttpPost]
        [AllowAnonymous]
        public async Task<JsonResult> Login([FromBody]PostObject msg)
        {
            System.Diagnostics.Debug.WriteLine(msg);
            return Json(new {resultValue = $"Working... {msg.msg}"});
        }
    }
    
    public class PostObject
    {
        public string msg { get; set; }
    }
}