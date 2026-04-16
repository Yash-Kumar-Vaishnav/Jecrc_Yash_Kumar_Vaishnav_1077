using System;
using System.ComponentModel.DataAnnotations;

namespace ClockSystemApi.Validators
{
    public class ValidTimeZoneAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null)
                return new ValidationResult("TimeZone is required");

            try
            {
                TimeZoneInfo.FindSystemTimeZoneById(value.ToString()!);
                return ValidationResult.Success;
            }
            catch
            {
                return new ValidationResult("Invalid TimeZone ID");
            }
        }
    }
}
