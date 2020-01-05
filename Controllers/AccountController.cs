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
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login()
        {

            return Json(new {resultValue = "Working..."});

        }
    }
}