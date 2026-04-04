using BillGeneratorSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace BillGeneratorSystem.Data;

public class BillGeneratorDbContext : DbContext
{
    public BillGeneratorDbContext(DbContextOptions<BillGeneratorDbContext> options)
        : base(options)
    {
    }

    public DbSet<CatalogItem> CatalogItems { get; set; }
    public DbSet<Bill> Bills { get; set; }
    public DbSet<BillItem> BillItems { get; set; }
    public DbSet<DailySummary> DailySummaries { get; set; }
    public DbSet<AuditLog> AuditLogs { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure relationships
        modelBuilder.Entity<BillItem>()
            .HasOne(bi => bi.Bill)
            .WithMany(b => b.Items)
            .HasForeignKey(bi => bi.BillId)
            .OnDelete(DeleteBehavior.Cascade);

        // Seed initial catalog data
        SeedInitialData(modelBuilder);
    }

    private void SeedInitialData(ModelBuilder modelBuilder)
    {
        // Entrance Fee Catalog
        modelBuilder.Entity<CatalogItem>().HasData(
            new CatalogItem { Id = 1, Name = "Adult Ticket", Description = "Full Price Entry", Price = 500, CatalogType = "entrance" },
            new CatalogItem { Id = 2, Name = "Child Ticket", Description = "Children below 12 years", Price = 250, CatalogType = "entrance" },
            new CatalogItem { Id = 3, Name = "Senior Ticket", Description = "Age 60+", Price = 300, CatalogType = "entrance" },
            new CatalogItem { Id = 4, Name = "VIP Ticket", Description = "Premium Access", Price = 1000, CatalogType = "entrance" }
        );

        // Donation Catalog
        modelBuilder.Entity<CatalogItem>().HasData(
            new CatalogItem { Id = 5, Name = "Small Donation", Description = "₹100 Donation", Price = 100, CatalogType = "donation" },
            new CatalogItem { Id = 6, Name = "Medium Donation", Description = "₹500 Donation", Price = 500, CatalogType = "donation" },
            new CatalogItem { Id = 7, Name = "Large Donation", Description = "₹1000 Donation", Price = 1000, CatalogType = "donation" }
        );

        // Product Catalog
        modelBuilder.Entity<CatalogItem>().HasData(
            new CatalogItem { Id = 8, Name = "T-Shirt", Description = "Event Merchandise", Price = 300, CatalogType = "product" },
            new CatalogItem { Id = 9, Name = "Coffee", Description = "Hot Beverage", Price = 100, CatalogType = "product" },
            new CatalogItem { Id = 10, Name = "Water Bottle", Description = "Reusable Bottle", Price = 150, CatalogType = "product" },
            new CatalogItem { Id = 11, Name = "Snack Pack", Description = "Assorted Snacks", Price = 200, CatalogType = "product" }
        );
    }
}
