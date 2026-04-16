using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using ClockSystemApi.Models;
using ClockSystemApi.DTOs;
using ClockSystemApi.Services;

namespace ClockSystemApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClockController : ControllerBase
    {
        private static List<CountryTime> data = new List<CountryTime>();
        private readonly TimeService _service = new TimeService();

        [HttpPost]
        public IActionResult Add(CountryTimeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var item = new CountryTime
            {
                Id = data.Count + 1,
                Country = dto.Country,
                TimeZoneId = dto.TimeZoneId
            };

            data.Add(item);
            return Ok(item);
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(data);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = data.Find(x => x.Id == id);

            if (item == null)
                return NotFound(new { message = "Not found" });

            var time = _service.GetTime(item.TimeZoneId);

            return Ok(new ResponseDto
            {
                Country = item.Country,
                CurrentTime = time
            });
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, CountryTimeDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var item = data.Find(x => x.Id == id);

            if (item == null)
                return NotFound();

            item.Country = dto.Country;
            item.TimeZoneId = dto.TimeZoneId;

            return Ok(item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = data.Find(x => x.Id == id);

            if (item == null)
                return NotFound();

            data.Remove(item);
            return Ok(new { message = "Deleted" });
        }
    }
}
