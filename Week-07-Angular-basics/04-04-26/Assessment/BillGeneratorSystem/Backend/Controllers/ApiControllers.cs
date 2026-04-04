using BillGeneratorSystem.Models;
using BillGeneratorSystem.Services;
using Microsoft.AspNetCore.Mvc;

namespace BillGeneratorSystem.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CatalogController : ControllerBase
{
    private readonly ICatalogService _catalogService;

    public CatalogController(ICatalogService catalogService)
    {
        _catalogService = catalogService;
    }

    [HttpGet]
    public async Task<ActionResult<List<CatalogItem>>> GetAllItems()
    {
        var items = await _catalogService.GetAllCatalogItemsAsync();
        return Ok(items);
    }

    [HttpGet("type/{catalogType}")]
    public async Task<ActionResult<List<CatalogItem>>> GetByType(string catalogType)
    {
        var items = await _catalogService.GetCatalogByTypeAsync(catalogType);
        return Ok(items);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CatalogItem>> GetById(int id)
    {
        var item = await _catalogService.GetCatalogItemByIdAsync(id);
        if (item == null)
            return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<ActionResult<CatalogItem>> Create([FromBody] CatalogItem item)
    {
        var created = await _catalogService.CreateCatalogItemAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CatalogItem>> Update(int id, [FromBody] CatalogItem item)
    {
        try
        {
            var updated = await _catalogService.UpdateCatalogItemAsync(id, item);
            return Ok(updated);
        }
        catch
        {
            return NotFound();
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _catalogService.DeleteCatalogItemAsync(id);
        if (!result)
            return NotFound();
        return NoContent();
    }

    [HttpGet("search/{searchTerm}")]
    public async Task<ActionResult<List<CatalogItem>>> Search(string searchTerm)
    {
        var items = await _catalogService.SearchCatalogAsync(searchTerm);
        return Ok(items);
    }
}

[ApiController]
[Route("api/[controller]")]
public class BillController : ControllerBase
{
    private readonly IBillService _billService;

    public BillController(IBillService billService)
    {
        _billService = billService;
    }

    [HttpPost("create")]
    public async Task<ActionResult<Bill>> CreateBill()
    {
        var bill = await _billService.CreateBillAsync();
        return CreatedAtAction(nameof(GetBill), new { id = bill.Id }, bill);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Bill>> GetBill(int id)
    {
        var bill = await _billService.GetBillByIdAsync(id);
        if (bill == null)
            return NotFound();
        return Ok(bill);
    }

    [HttpGet]
    public async Task<ActionResult<List<Bill>>> GetAll()
    {
        var bills = await _billService.GetAllBillsAsync();
        return Ok(bills);
    }

    [HttpGet("date/{date}")]
    public async Task<ActionResult<List<Bill>>> GetByDate(string date)
    {
        if (!DateTime.TryParse(date, out var parsedDate))
            return BadRequest("Invalid date format");
        
        var bills = await _billService.GetBillsByDateAsync(parsedDate);
        return Ok(bills);
    }

    [HttpPost("{billId}/items")]
    public async Task<ActionResult<Bill>> AddItem(int billId, [FromBody] AddItemRequest request)
    {
        try
        {
            var bill = await _billService.AddItemToBillAsync(billId, request.CatalogItemId, request.Quantity, request.UnitPrice);
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{billId}/items/{itemId}")]
    public async Task<ActionResult<Bill>> UpdateItem(int billId, int itemId, [FromBody] UpdateItemRequest request)
    {
        try
        {
            var bill = await _billService.UpdateBillItemAsync(billId, itemId, request.Quantity, request.UnitPrice);
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpDelete("{billId}/items/{itemId}")]
    public async Task<ActionResult<Bill>> RemoveItem(int billId, int itemId)
    {
        try
        {
            var bill = await _billService.RemoveItemFromBillAsync(billId, itemId);
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("{billId}/discount")]
    public async Task<ActionResult<Bill>> ApplyDiscount(int billId, [FromBody] DiscountRequest request)
    {
        try
        {
            var bill = await _billService.ApplyDiscountAsync(billId, request.DiscountAmount, request.DiscountPercentage);
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("{billId}/tax")]
    public async Task<ActionResult<Bill>> SetTax(int billId, [FromBody] TaxRequest request)
    {
        try
        {
            var bill = await _billService.SetTaxAsync(billId, request.TaxPercentage);
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("{billId}/complete")]
    public async Task<ActionResult<Bill>> CompleteBill(int billId)
    {
        try
        {
            var bill = await _billService.CompleteBillAsync(billId);
            return Ok(bill);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpPost("{billId}/search")]
    public async Task<ActionResult<List<Bill>>> Search(string invoiceNumber)
    {
        var bills = await _billService.SearchBillsAsync(invoiceNumber);
        return Ok(bills);
    }
}

[ApiController]
[Route("api/[controller]")]
public class InvoiceController : ControllerBase
{
    private readonly IInvoiceService _invoiceService;

    public InvoiceController(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }

    [HttpGet("{billId}/pdf")]
    public async Task<IActionResult> GeneratePdf(int billId)
    {
        try
        {
            var pdfBytes = await _invoiceService.GeneratePdfInvoiceAsync(billId);
            return File(pdfBytes, "application/pdf", $"invoice_{billId}.pdf");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{billId}/csv")]
    public async Task<IActionResult> GenerateCsv(int billId)
    {
        try
        {
            var csv = await _invoiceService.GenerateCsvInvoiceAsync(billId);
            return File(System.Text.Encoding.UTF8.GetBytes(csv), "text/csv", $"invoice_{billId}.csv");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;

    public ReportController(IReportService reportService)
    {
        _reportService = reportService;
    }

    [HttpGet("daily/{date}")]
    public async Task<ActionResult<DailySummary>> GetDailySummary(string date)
    {
        if (!DateTime.TryParse(date, out var parsedDate))
            return BadRequest("Invalid date format");

        var summary = await _reportService.GetDailySummaryAsync(parsedDate);
        if (summary == null)
            return NotFound();

        return Ok(summary);
    }

    [HttpGet("range")]
    public async Task<ActionResult<List<DailySummary>>> GetRange([FromQuery] string startDate, [FromQuery] string endDate)
    {
        if (!DateTime.TryParse(startDate, out var start) || !DateTime.TryParse(endDate, out var end))
            return BadRequest("Invalid date format");

        var summaries = await _reportService.GetSummaryRangeAsync(start, end);
        return Ok(summaries);
    }

    [HttpGet("monthly")]
    public async Task<ActionResult<decimal>> GetMonthlyRevenue([FromQuery] int month, [FromQuery] int year)
    {
        var revenue = await _reportService.GetMonthlyRevenueAsync(month, year);
        return Ok(new { revenue });
    }
}

// DTOs
public class AddItemRequest
{
    public int CatalogItemId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public class UpdateItemRequest
{
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}

public class DiscountRequest
{
    public decimal DiscountAmount { get; set; }
    public decimal? DiscountPercentage { get; set; }
}

public class TaxRequest
{
    public decimal TaxPercentage { get; set; }
}
