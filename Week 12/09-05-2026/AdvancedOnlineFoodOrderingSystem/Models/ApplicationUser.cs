using Microsoft.AspNetCore.Identity;

namespace OnlineFoodOrderingSystem.Models
{
    public class ApplicationUser : IdentityUser
    {
        public string FullName { get; set; } = string.Empty;
    }
}