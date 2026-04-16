using System.ComponentModel.DataAnnotations;
namespace EmployeePortal.models.attributes
{
    public class MinSalaryAttributes : ValidationAttribute
    {
        private readonly decimal minSalary;

        public MinSalaryAttributes(int minSalary)
        {
            this.minSalary = minSalary;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is decimal salary)
            {
                if (salary < minSalary)
                {
                    return new ValidationResult($"Salary must be at least {minSalary}.");
                }
            }
            return ValidationResult.Success;
        }
    }
}