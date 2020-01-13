using Microsoft.AspNetCore.Identity;

namespace AutoService.Models.IdentityModels
{
    public class User : IdentityUser
    {
        public string Role { get; set; }
    }
}