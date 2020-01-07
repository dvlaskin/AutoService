using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace AutoService.Auth
{
    public class AuthOptions
    {
        public const string ISSUER = "AutoServiceServer"; // издатель токена
        public const string AUDIENCE = "AutoServiceClient"; // потребитель токена
        const string KEY = "AutoService_secretkey!1984";   // ключ для шифрации
        public const int LIFETIME = 10; // время жизни токена - в минутах
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}