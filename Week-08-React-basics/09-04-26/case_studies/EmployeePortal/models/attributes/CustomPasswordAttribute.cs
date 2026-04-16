using System.ComponentModel.DataAnnotations;
namespace EmployeePortal_BE.models.attributes
{
    public class CustomPasswordAttribute : ValidationAttribute
    {


        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is string password)
            {
                if (password.Length < 8 || password.Any(char.IsDigit) || password.Any(char.IsUpper) || password.Any(char.IsLower))
                {
                    return new ValidationResult("Password must be at least 8 characters long and contain at least one digit, one uppercase letter, one lowercase letter, and one special character.");
                }
            }
            return ValidationResult.Success;
        }
    }
}