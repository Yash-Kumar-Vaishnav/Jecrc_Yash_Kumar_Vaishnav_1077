using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrderingSystem.Data;

namespace OnlineFoodOrderingSystem.Controllers
{
    public class HomeController : Controller
    {
        private readonly ApplicationDbContext _context;

        public HomeController(ApplicationDbContext context)
        {
            _context = context;
        }

        public IActionResult Index()
        {
            var foods = _context.FoodItems.ToList();

            return View(foods);
        }
    }
}