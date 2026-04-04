using BillGeneratorSystem.Data;
using BillGeneratorSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorSystem.Services;

public interface IBillService
{
    Task<Bill> CreateBillAsync();
    Task<Bill?> GetBillByIdAsync(int id);
    Task<List<Bill>> GetAllBillsAsync();
    Task<List<Bill>> GetBillsByDateAsync(DateTime date);
    Task<Bill> AddItemToBillAsync(int billId, int catalogItemId, int quantity, decimal unitPrice);
    Task<Bill> UpdateBillItemAsync(int billId, int itemId, int quantity, decimal unitPrice);
    Task<Bill> RemoveItemFromBillAsync(int billId, int itemId);
    Task<Bill> ApplyDiscountAsync(int billId, decimal discountAmount, decimal? discountPercentage = null);
    Task<Bill> SetTaxAsync(int billId, decimal taxPercentage);
    Task<Bill> CompleteBillAsync(int billId);
    Task<bool> DeleteBillAsync(int billId);
    Task<List<Bill>> SearchBillsAsync(string invoiceNumber);
}

public class BillService : IBillService
{
    private readonly BillGeneratorDbContext _context;

    public BillService(BillGeneratorDbContext context)
    {
        _context = context;
    }

    public async Task<Bill> CreateBillAsync()
    {
        var bill = new Bill
        {
            InvoiceNumber = GenerateInvoiceNumber(),
            Status = BillStatus.Draft,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Bills.Add(bill);
        await _context.SaveChangesAsync();
        return bill;
    }

    public async Task<Bill?> GetBillByIdAsync(int id)
    {
        return await _context.Bills
            .Include(b => b.Items)
            .FirstOrDefaultAsync(b => b.Id == id);
    }

    public async Task<List<Bill>> GetAllBillsAsync()
    {
        return await _context.Bills
            .Include(b => b.Items)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<List<Bill>> GetBillsByDateAsync(DateTime date)
    {
        var startDate = date.Date;
        var endDate = startDate.AddDays(1);

        return await _context.Bills
            .Include(b => b.Items)
            .Where(b => b.CreatedAt >= startDate && b.CreatedAt < endDate)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    public async Task<Bill> AddItemToBillAsync(int billId, int catalogItemId, int quantity, decimal unitPrice)
    {
        var bill = await GetBillByIdAsync(billId);
        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        var catalogItem = await _context.CatalogItems.FindAsync(catalogItemId);
        if (catalogItem == null)
            throw new InvalidOperationException("Catalog item not found");

        var billItem = new BillItem
        {
            BillId = billId,
            CatalogItemId = catalogItemId,
            ItemName = catalogItem.Name,
            Quantity = quantity,
            UnitPrice = unitPrice,
            LineTotal = quantity * unitPrice
        };

        bill.Items.Add(billItem);
        RecalculateBillTotals(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<Bill> UpdateBillItemAsync(int billId, int itemId, int quantity, decimal unitPrice)
    {
        var bill = await GetBillByIdAsync(billId);
        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        var item = bill.Items.FirstOrDefault(i => i.Id == itemId);
        if (item == null)
            throw new InvalidOperationException("Bill item not found");

        item.Quantity = quantity;
        item.UnitPrice = unitPrice;
        item.LineTotal = quantity * unitPrice;

        RecalculateBillTotals(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<Bill> RemoveItemFromBillAsync(int billId, int itemId)
    {
        var bill = await GetBillByIdAsync(billId);
        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        var item = bill.Items.FirstOrDefault(i => i.Id == itemId);
        if (item == null)
            throw new InvalidOperationException("Bill item not found");

        bill.Items.Remove(item);
        RecalculateBillTotals(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<Bill> ApplyDiscountAsync(int billId, decimal discountAmount, decimal? discountPercentage = null)
    {
        var bill = await GetBillByIdAsync(billId);
        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        if (discountPercentage.HasValue)
        {
            bill.DiscountPercentage = discountPercentage.Value;
            bill.DiscountAmount = (bill.SubTotal * discountPercentage.Value) / 100;
        }
        else
        {
            bill.DiscountAmount = discountAmount;
            bill.DiscountPercentage = (discountAmount / bill.SubTotal) * 100;
        }

        RecalculateBillTotals(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<Bill> SetTaxAsync(int billId, decimal taxPercentage)
    {
        var bill = await GetBillByIdAsync(billId);
        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        bill.TaxPercentage = taxPercentage;
        RecalculateBillTotals(bill);
        await _context.SaveChangesAsync();

        return bill;
    }

    public async Task<Bill> CompleteBillAsync(int billId)
    {
        var bill = await GetBillByIdAsync(billId);
        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        bill.Status = BillStatus.Completed;
        bill.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        // Create daily summary if not exists
        await UpdateDailySummaryAsync(bill);

        return bill;
    }

    public async Task<bool> DeleteBillAsync(int billId)
    {
        var bill = await _context.Bills.FindAsync(billId);
        if (bill == null)
            return false;

        bill.Status = BillStatus.Cancelled;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<List<Bill>> SearchBillsAsync(string invoiceNumber)
    {
        return await _context.Bills
            .Include(b => b.Items)
            .Where(b => b.InvoiceNumber.Contains(invoiceNumber))
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();
    }

    private void RecalculateBillTotals(Bill bill)
    {
        bill.SubTotal = bill.Items.Sum(i => i.LineTotal);
        bill.TaxAmount = (bill.SubTotal - bill.DiscountAmount) * (bill.TaxPercentage / 100);
        bill.Total = bill.SubTotal - bill.DiscountAmount + bill.TaxAmount;
        bill.UpdatedAt = DateTime.UtcNow;
    }

    private async Task UpdateDailySummaryAsync(Bill bill)
    {
        var summaryDate = bill.CreatedAt.Date;
        var summary = await _context.DailySummaries
            .FirstOrDefaultAsync(s => s.SummaryDate == summaryDate);

        if (summary == null)
        {
            summary = new DailySummary
            {
                SummaryDate = summaryDate,
                TotalBills = 1,
                TotalRevenue = bill.Total,
                TotalTax = bill.TaxAmount,
                TotalDiscount = bill.DiscountAmount
            };
            _context.DailySummaries.Add(summary);
        }
        else
        {
            summary.TotalBills++;
            summary.TotalRevenue += bill.Total;
            summary.TotalTax += bill.TaxAmount;
            summary.TotalDiscount += bill.DiscountAmount;
        }

        await _context.SaveChangesAsync();
    }

    private string GenerateInvoiceNumber()
    {
        return $"INV-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString().Substring(0, 8).ToUpper()}";
    }
}
