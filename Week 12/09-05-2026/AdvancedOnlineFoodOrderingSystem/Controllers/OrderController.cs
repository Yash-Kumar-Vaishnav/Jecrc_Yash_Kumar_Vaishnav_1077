using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrderingSystem.Data;
using OnlineFoodOrderingSystem.Models;

namespace OnlineFoodOrderingSystem.Controllers
{
    public class OrderController : Controller
    {
        private readonly ApplicationDbContext _context;

        public OrderController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Order History
        public IActionResult Orders()
        {
            var orders = _context.Orders.ToList();

            return View(orders);
        }

        // Update Status
        public IActionResult UpdateStatus(int id)
        {
            var order = _context.Orders.Find(id);

            if (order != null)
            {
                order.Status = "Delivered";

                _context.SaveChanges();
            }

            return RedirectToAction("Orders");
        }

        // Invoice
        public IActionResult Invoice(int id)
        {
            var order = _context.Orders.Find(id);

            return View(order);
        }
    }
}