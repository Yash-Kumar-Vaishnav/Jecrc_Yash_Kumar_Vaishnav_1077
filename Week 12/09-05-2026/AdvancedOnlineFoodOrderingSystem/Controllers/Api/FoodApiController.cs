using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OnlineFoodOrderingSystem.Data;

namespace OnlineFoodOrderingSystem.Controllers.Api
{
    [ApiController]
    [Route("api/[controller]")]
    public class FoodApiController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public FoodApiController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetFoods()
        {
            return Ok(await _context.FoodItems.ToListAsync());
        }
    }
}