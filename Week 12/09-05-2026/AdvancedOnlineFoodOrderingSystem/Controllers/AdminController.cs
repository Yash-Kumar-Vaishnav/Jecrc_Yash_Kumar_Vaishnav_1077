using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrderingSystem.Data;
using OnlineFoodOrderingSystem.Models;

namespace OnlineFoodOrderingSystem.Controllers
{
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Dashboard
        public IActionResult Dashboard()
        {
            return View();
        }

        // Food List
        public IActionResult Foods()
        {
            var foods = _context.FoodItems.ToList();

            return View(foods);
        }

        // GET Create
        [HttpGet]
        public IActionResult CreateFood()
        {
            return View();
        }

        // POST Create
        [HttpPost]
        public IActionResult CreateFood(FoodItem item)
        {
            try
            {
                _context.FoodItems.Add(item);

                _context.SaveChanges();

                return RedirectToAction("Foods");
            }
            catch (Exception ex)
            {
                return Content(ex.Message);
            }
        }

        // GET Edit
        [HttpGet]
        public IActionResult EditFood(int id)
        {
            var food = _context.FoodItems.Find(id);

            return View(food);
        }

        // POST Edit
        [HttpPost]
        public IActionResult EditFood(FoodItem item)
        {
            _context.FoodItems.Update(item);

            _context.SaveChanges();

            return RedirectToAction("Foods");
        }

        // Delete
        public IActionResult DeleteFood(int id)
        {
            var food = _context.FoodItems.Find(id);

            if (food != null)
            {
                _context.FoodItems.Remove(food);

                _context.SaveChanges();
            }

            return RedirectToAction("Foods");
        }
    }
}