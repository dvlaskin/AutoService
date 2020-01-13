using System.Linq;
using System.Collections.Generic;
using AutoService.Models.IdentityModels;

namespace AutoService.DataBase
{
    public class UsersTable
    {
        // тестовые данные вместо использования базы данных
        private List<User> people = new List<User>
        {
            new User() { Email = "admin@mail.com", PasswordHash= "12345", Role = "admin", UserName = "admin"},
            new User() { Email = "user@mail.com", PasswordHash= "123", Role = "user", UserName = "user"}
        };
        
        public UsersTable()
        {
                
        }

        public User GetUser(string login, string password)
        {
            return people.FirstOrDefault(x => x.Email == login && x.PasswordHash == password);
        }
    }
}