using Microsoft.AspNetCore.Mvc;
using OnlineFoodOrderingSystem.Data;
using OnlineFoodOrderingSystem.Models;

namespace OnlineFoodOrderingSystem.Controllers
{
    public class CartController : Controller
    {
        private readonly ApplicationDbContext _context;

        public CartController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Cart List
        public IActionResult Index()
        {
            var cartItems = _context.CartItems.ToList();

            return View(cartItems);
        }

        // Add To Cart
        public IActionResult AddToCart(int id)
        {
            var food = _context.FoodItems.Find(id);

            if (food != null)
            {
                CartItem item = new CartItem
                {
                    FoodItemId = food.Id,
                    Quantity = 1
                };

                _context.CartItems.Add(item);

                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        // Remove Cart Item
        public IActionResult Remove(int id)
        {
            var item = _context.CartItems.Find(id);

            if (item != null)
            {
                _context.CartItems.Remove(item);

                _context.SaveChanges();
            }

            return RedirectToAction("Index");
        }
        // Checkout
        public IActionResult Checkout()
        {
            var cartItems = _context.CartItems.ToList();

            foreach (var item in cartItems)
            {
                Order order = new Order
                {
                    OrderDate = DateTime.Now,
                    Status = "Placed"
                };

                _context.Orders.Add(order);
            }

            _context.CartItems.RemoveRange(cartItems);

            _context.SaveChanges();

            return RedirectToAction("Orders", "Order");
        }
    }
}