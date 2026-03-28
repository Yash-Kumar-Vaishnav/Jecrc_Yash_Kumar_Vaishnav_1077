using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HackerBank.API.Data;
using HackerBank.API.Models;

namespace HackerBank.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<TransactionsController> _logger;

        public TransactionsController(AppDbContext context, ILogger<TransactionsController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Transaction>), StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Transaction>>> GetTransactions(
            [FromQuery] string? date = null,
            [FromQuery] bool sortByAmount = false)
        {
            IQueryable<Transaction> query = _context.Transactions;

            if (!string.IsNullOrWhiteSpace(date))
            {
                query = query.Where(t => t.Date == date);
            }

            if (sortByAmount)
            {
                query = query.OrderBy(t => t.Amount);
            }

            var transactions = await query.ToListAsync();
            return Ok(transactions);
        }

        [HttpGet("{id:int}")]
        [ProducesResponseType(typeof(Transaction), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Transaction>> GetTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound(new { message = $"Transaction with ID {id} not found." });
            }
            return Ok(transaction);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Transaction), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Transaction>> CreateTransaction([FromBody] Transaction transaction)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTransaction), new { id = transaction.Id }, transaction);
        }

        [HttpDelete("{id:int}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteTransaction(int id)
        {
            var transaction = await _context.Transactions.FindAsync(id);
            if (transaction == null)
            {
                return NotFound(new { message = $"Transaction with ID {id} not found." });
            }

            _context.Transactions.Remove(transaction);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
