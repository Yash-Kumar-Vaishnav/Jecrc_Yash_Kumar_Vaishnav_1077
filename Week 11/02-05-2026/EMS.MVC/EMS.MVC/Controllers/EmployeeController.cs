using EMS.MVC.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;

namespace EMS.MVC.Controllers
{
    public class EmployeeController : Controller
    {
        private readonly HttpClient _client;

        public EmployeeController()
        {
            _client = new HttpClient();
            _client.BaseAddress = new Uri("http://localhost:5104/");
        }

        // 🔹 GET ALL
        public async Task<IActionResult> Index()
        {
            List<Employee> empList = new List<Employee>();

            var response = await _client.GetAsync("api/employee");

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                empList = JsonConvert.DeserializeObject<List<Employee>>(data);
            }

            return View(empList);
        }

        // 🔹 CREATE (GET)
        public IActionResult Create()
        {
            return View();
        }

        // 🔹 CREATE (POST)
        [HttpPost]
        public async Task<IActionResult> Create(Employee emp)
        {
            var json = JsonConvert.SerializeObject(emp);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            await _client.PostAsync("api/employee", content);

            return RedirectToAction("Index");
        }

        // 🔹 EDIT (GET)
        public async Task<IActionResult> Edit(int id)
        {
            Employee emp = new Employee();

            var response = await _client.GetAsync($"api/employee/{id}");

            if (response.IsSuccessStatusCode)
            {
                var data = await response.Content.ReadAsStringAsync();
                emp = JsonConvert.DeserializeObject<Employee>(data);
            }

            return View(emp);
        }

        // 🔹 EDIT (POST)
        [HttpPost]
        public async Task<IActionResult> Edit(Employee emp)
        {
            var json = JsonConvert.SerializeObject(emp);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            await _client.PutAsync($"api/employee/{emp.Id}", content);

            return RedirectToAction("Index");
        }

        // 🔹 DELETE
        public async Task<IActionResult> Delete(int id)
        {
            await _client.DeleteAsync($"api/employee/{id}");
            return RedirectToAction("Index");
        }
    }
}