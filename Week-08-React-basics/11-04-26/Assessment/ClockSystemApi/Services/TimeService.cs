using System;

namespace ClockSystemApi.Services
{
    public class TimeService
    {
        public string GetTime(string timezoneId)
        {
            var tz = TimeZoneInfo.FindSystemTimeZoneById(timezoneId);
            var time = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, tz);
            return time.ToString("yyyy-MM-dd HH:mm:ss");
        }
    }
}
