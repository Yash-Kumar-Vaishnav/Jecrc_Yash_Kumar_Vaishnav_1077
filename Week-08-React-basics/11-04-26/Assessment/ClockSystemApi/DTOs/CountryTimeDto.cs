using System.ComponentModel.DataAnnotations;
using ClockSystemApi.Validators;

namespace ClockSystemApi.DTOs
{
    public class CountryTimeDto
    {
        [Required]
        [MinLength(2)]
        public string Country { get; set; } = string.Empty;

        [Required]
        [ValidTimeZone]
        public string TimeZoneId { get; set; } = string.Empty;
    }
}
