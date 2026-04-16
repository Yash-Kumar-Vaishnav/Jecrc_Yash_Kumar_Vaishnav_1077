namespace ClockSystemApi.Models
{
    public class CountryTime
    {
        public int Id { get; set; }
        public string Country { get; set; } = string.Empty;
        public string TimeZoneId { get; set; } = string.Empty;
    }
}
