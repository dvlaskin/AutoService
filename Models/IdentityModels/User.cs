using Microsoft.AspNetCore.Identity;

namespace AutoService.Models.IdentityModels
{
    public class User : IdentityUser
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}