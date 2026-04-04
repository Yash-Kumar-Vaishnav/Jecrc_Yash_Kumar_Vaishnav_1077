namespace BillGeneratorSystem.Models;

// Catalog Models
public class CatalogItem
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string CatalogType { get; set; } = string.Empty; // "entrance", "donation", "product", "custom"
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}

// Bill/Invoice Models
public class Bill
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public BillStatus Status { get; set; } = BillStatus.Draft;
    
    // Financial Details
    public decimal SubTotal { get; set; }
    public decimal TaxPercentage { get; set; } = 5m;
    public decimal TaxAmount { get; set; }
    public decimal DiscountAmount { get; set; }
    public decimal DiscountPercentage { get; set; }
    public decimal Total { get; set; }
    
    // Items
    public List<BillItem> Items { get; set; } = [];
    
    // Notes
    public string Notes { get; set; } = string.Empty;
}

public class BillItem
{
    public int Id { get; set; }
    public int BillId { get; set; }
    public int CatalogItemId { get; set; }
    public string ItemName { get; set; } = string.Empty;
    public int Quantity { get; set; } = 1;
    public decimal UnitPrice { get; set; }
    public decimal LineTotal { get; set; }
    
    public Bill? Bill { get; set; }
}

public enum BillStatus
{
    Draft,
    Completed,
    Cancelled,
    Paid
}

// Daily Summary
public class DailySummary
{
    public int Id { get; set; }
    public DateTime SummaryDate { get; set; }
    public int TotalBills { get; set; }
    public decimal TotalRevenue { get; set; }
    public decimal TotalTax { get; set; }
    public decimal TotalDiscount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

// Audit Log
public class AuditLog
{
    public int Id { get; set; }
    public string Action { get; set; } = string.Empty;
    public string EntityType { get; set; } = string.Empty;
    public int EntityId { get; set; }
    public string OldValue { get; set; } = string.Empty;
    public string NewValue { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
