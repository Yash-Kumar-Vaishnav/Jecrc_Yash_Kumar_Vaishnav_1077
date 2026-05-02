using EMS.API.Data;
using EMS.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EMS.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/employee
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var data = await _context.Employees.ToListAsync();
            return Ok(data);
        }

        // GET: api/employee/1
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            return Ok(emp);
        }

        // POST: api/employee
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Employee emp)
        {
            if (emp == null)
                return BadRequest("Invalid data");

            _context.Employees.Add(emp);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = emp.Id }, emp);
        }

        // PUT: api/employee/1
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Employee emp)
        {
            if (id != emp.Id)
                return BadRequest("ID mismatch");

            var existing = await _context.Employees.FindAsync(id);
            if (existing == null)
                return NotFound(new { message = "Employee not found" });

            existing.Name = emp.Name;
            existing.Role = emp.Role;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }

        // DELETE: api/employee/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var emp = await _context.Employees.FindAsync(id);
            if (emp == null)
                return NotFound(new { message = "Employee not found" });

            _context.Employees.Remove(emp);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Deleted successfully" });
        }
    }
}