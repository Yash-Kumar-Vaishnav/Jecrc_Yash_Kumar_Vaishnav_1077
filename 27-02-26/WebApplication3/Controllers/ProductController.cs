using Microsoft.AspNetCore.Mvc;
using WebApplication2.Models;
using System.Collections.Generic;

namespace WebApplication2.Controllers
{
    public class ProductController : Controller
    {
        private static List<Product> products = new List<Product>
        {
            new Product { Id = 1, Name = "Pen", Description = "Blue Ink Pen", Price = 10.0 },
            new Product { Id = 2, Name = "Pencil", Description = "HB Pencil", Price = 20.0 },
            new Product { Id = 3, Name = "Rubber", Description = "Eraser", Price = 30.0 }
        };

        public IActionResult Index()
        {
            return View(products);
        }
    }
}