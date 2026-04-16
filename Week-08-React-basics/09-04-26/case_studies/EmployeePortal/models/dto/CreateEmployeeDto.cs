using System.ComponentModel.DataAnnotations;
using EmployeePortal_BE.models.attributes;

namespace EmployeePortal.models.dto
{
  public class CreateEmployeeDto
    {
        [Required]
        [StringLength(30, MinimumLength = 3)]
        public string name { get; set; }
        
        [Required]
        [StringLength(50, MinimumLength = 2)]
        public string department { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }
        
        [Required]
        [CustomPassword()]
        public string password { get; set; }
        
        [Required]
        [Phone]
        [RegularExpression(@"^\+[1-9][1-9]-[6-9]\d{9,14}$",ErrorMessage = "Invalid Phone Number")]
        // [RegularExpression(@"^\+\d{1,3}-\d{10}$",ErrorMessage = "Invalid Phone Number")]
        public string phone { get; set; }

        [Required]
        // [Range(1000,10000,ErrorMessage = "Salary must be between 1000 and 10000")]
        [RangeMaxAttribute(1000,10000)]
        public decimal salary { get; set; }
        
        [StringLength(50)]
        public string address { get; set; }
    }
}
