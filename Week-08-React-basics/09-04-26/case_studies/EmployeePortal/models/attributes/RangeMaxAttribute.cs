using System.ComponentModel.DataAnnotations;
namespace EmployeePortal_BE.models.attributes
{
    public class RangeMaxAttribute : ValidationAttribute
    {
        private readonly decimal minSalary;
        private readonly decimal maxSalary;

        public RangeMaxAttribute(int minSalary, int maxSalary)
        {
            this.minSalary = minSalary;
            this.maxSalary = maxSalary;

        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is decimal salary)
            {
                if (salary < minSalary || salary > maxSalary)
                {
                    return new ValidationResult($"Salary must be in range of {minSalary} to {maxSalary}.");
                }
            }
            return ValidationResult.Success;
        }
    }
}