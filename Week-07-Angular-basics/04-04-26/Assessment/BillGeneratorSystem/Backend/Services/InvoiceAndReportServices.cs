using BillGeneratorSystem.Data;
using BillGeneratorSystem.Models;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace BillGeneratorSystem.Services;

public interface IInvoiceService
{
    Task<byte[]> GeneratePdfInvoiceAsync(int billId);
    Task<string> GenerateCsvInvoiceAsync(int billId);
}

public interface IReportService
{
    Task<DailySummary?> GetDailySummaryAsync(DateTime date);
    Task<List<DailySummary>> GetSummaryRangeAsync(DateTime startDate, DateTime endDate);
    Task<decimal> GetMonthlyRevenueAsync(int month, int year);
}

public class InvoiceService : IInvoiceService
{
    private readonly BillGeneratorDbContext _context;

    public InvoiceService(BillGeneratorDbContext context)
    {
        _context = context;
    }

    public async Task<byte[]> GeneratePdfInvoiceAsync(int billId)
    {
        var bill = await _context.Bills
            .Include(b => b.Items)
            .FirstOrDefaultAsync(b => b.Id == billId);

        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        using (var memoryStream = new MemoryStream())
        {
            var document = new Document(PageSize.A4, 50, 50, 50, 50);
            var writer = PdfWriter.GetInstance(document, memoryStream);
            document.Open();

            // Header
            var titleFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 16);
            var headerFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 12);
            var normalFont = FontFactory.GetFont(FontFactory.HELVETICA, 10);

            document.Add(new Paragraph("INVOICE", titleFont) { Alignment = Element.ALIGN_CENTER });
            document.Add(new Paragraph($"Invoice No: {bill.InvoiceNumber}", headerFont));
            document.Add(new Paragraph($"Date: {bill.CreatedAt:yyyy-MM-dd HH:mm}", normalFont));
            document.Add(new Paragraph(" "));

            // Items Table
            var table = new PdfPTable(4);
            table.WidthPercentage = 100;
            table.SetWidths(new float[] { 40, 20, 20, 20 });

            var headerCellFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 10);
            AddHeaderCell(table, "Item Name", headerCellFont);
            AddHeaderCell(table, "Quantity", headerCellFont);
            AddHeaderCell(table, "Unit Price", headerCellFont);
            AddHeaderCell(table, "Line Total", headerCellFont);

            foreach (var item in bill.Items)
            {
                table.AddCell(new PdfPCell(new Phrase(item.ItemName, normalFont)));
                table.AddCell(new PdfPCell(new Phrase(item.Quantity.ToString(), normalFont)) { HorizontalAlignment = Element.ALIGN_RIGHT });
                table.AddCell(new PdfPCell(new Phrase($"₹{item.UnitPrice:F2}", normalFont)) { HorizontalAlignment = Element.ALIGN_RIGHT });
                table.AddCell(new PdfPCell(new Phrase($"₹{item.LineTotal:F2}", normalFont)) { HorizontalAlignment = Element.ALIGN_RIGHT });
            }

            document.Add(table);
            document.Add(new Paragraph(" "));

            // Totals
            var totalsFont = FontFactory.GetFont(FontFactory.HELVETICA, 10);
            var totalsBoldFont = FontFactory.GetFont(FontFactory.HELVETICA_BOLD, 11);

            var totalsTable = new PdfPTable(2);
            totalsTable.WidthPercentage = 50;
            totalsTable.HorizontalAlignment = Element.ALIGN_RIGHT;

            AddTotalRow(totalsTable, "Subtotal:", bill.SubTotal, totalsFont);
            if (bill.DiscountAmount > 0)
                AddTotalRow(totalsTable, $"Discount ({bill.DiscountPercentage:F1}%):", -bill.DiscountAmount, totalsFont);
            AddTotalRow(totalsTable, $"Tax ({bill.TaxPercentage:F1}%):", bill.TaxAmount, totalsFont);
            AddTotalRow(totalsTable, "TOTAL:", bill.Total, totalsBoldFont);

            document.Add(totalsTable);

            if (!string.IsNullOrEmpty(bill.Notes))
            {
                document.Add(new Paragraph(" "));
                document.Add(new Paragraph("Notes:", headerFont));
                document.Add(new Paragraph(bill.Notes, normalFont));
            }

            document.Close();
            return memoryStream.ToArray();
        }
    }

    public async Task<string> GenerateCsvInvoiceAsync(int billId)
    {
        var bill = await _context.Bills
            .Include(b => b.Items)
            .FirstOrDefaultAsync(b => b.Id == billId);

        if (bill == null)
            throw new InvalidOperationException("Bill not found");

        var sb = new StringBuilder();
        sb.AppendLine("Bill Generator System - Invoice CSV Export");
        sb.AppendLine($"Invoice Number,{bill.InvoiceNumber}");
        sb.AppendLine($"Date,{bill.CreatedAt:yyyy-MM-dd HH:mm}");
        sb.AppendLine();

        sb.AppendLine("Item Name,Quantity,Unit Price,Line Total");
        foreach (var item in bill.Items)
        {
            sb.AppendLine($"{item.ItemName},{item.Quantity},{item.UnitPrice:F2},{item.LineTotal:F2}");
        }

        sb.AppendLine();
        sb.AppendLine($"Subtotal,{bill.SubTotal:F2}");
        if (bill.DiscountAmount > 0)
            sb.AppendLine($"Discount,{bill.DiscountAmount:F2}");
        sb.AppendLine($"Tax ({bill.TaxPercentage}%),{bill.TaxAmount:F2}");
        sb.AppendLine($"Total,{bill.Total:F2}");

        return sb.ToString();
    }

    private void AddHeaderCell(PdfPTable table, string text, Font font)
    {
        var cell = new PdfPCell(new Phrase(text, font))
        {
            BackgroundColor = new BaseColor(200, 200, 200),
            Padding = 5,
            HorizontalAlignment = Element.ALIGN_CENTER
        };
        table.AddCell(cell);
    }

    private void AddTotalRow(PdfPTable table, string label, decimal amount, Font font)
    {
        table.AddCell(new PdfPCell(new Phrase(label, font)) { Border = PdfPCell.NO_BORDER });
        table.AddCell(new PdfPCell(new Phrase($"₹{amount:F2}", font)) { Border = PdfPCell.NO_BORDER, HorizontalAlignment = Element.ALIGN_RIGHT });
    }
}

public class ReportService : IReportService
{
    private readonly BillGeneratorDbContext _context;

    public ReportService(BillGeneratorDbContext context)
    {
        _context = context;
    }

    public async Task<DailySummary?> GetDailySummaryAsync(DateTime date)
    {
        return await _context.DailySummaries
            .FirstOrDefaultAsync(s => s.SummaryDate == date.Date);
    }

    public async Task<List<DailySummary>> GetSummaryRangeAsync(DateTime startDate, DateTime endDate)
    {
        return await _context.DailySummaries
            .Where(s => s.SummaryDate >= startDate.Date && s.SummaryDate <= endDate.Date)
            .OrderByDescending(s => s.SummaryDate)
            .ToListAsync();
    }

    public async Task<decimal> GetMonthlyRevenueAsync(int month, int year)
    {
        var startDate = new DateTime(year, month, 1);
        var endDate = startDate.AddMonths(1);

        return await _context.DailySummaries
            .Where(s => s.SummaryDate >= startDate && s.SummaryDate < endDate)
            .SumAsync(s => s.TotalRevenue);
    }
}
