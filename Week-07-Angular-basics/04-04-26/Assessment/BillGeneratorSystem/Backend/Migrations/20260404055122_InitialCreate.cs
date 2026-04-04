using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace BillGeneratorSystem.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AuditLogs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Action = table.Column<string>(type: "TEXT", nullable: false),
                    EntityType = table.Column<string>(type: "TEXT", nullable: false),
                    EntityId = table.Column<int>(type: "INTEGER", nullable: false),
                    OldValue = table.Column<string>(type: "TEXT", nullable: false),
                    NewValue = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuditLogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Bills",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    InvoiceNumber = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Status = table.Column<int>(type: "INTEGER", nullable: false),
                    SubTotal = table.Column<decimal>(type: "TEXT", nullable: false),
                    TaxPercentage = table.Column<decimal>(type: "TEXT", nullable: false),
                    TaxAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                    DiscountAmount = table.Column<decimal>(type: "TEXT", nullable: false),
                    DiscountPercentage = table.Column<decimal>(type: "TEXT", nullable: false),
                    Total = table.Column<decimal>(type: "TEXT", nullable: false),
                    Notes = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Bills", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CatalogItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    CatalogType = table.Column<string>(type: "TEXT", nullable: false),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CatalogItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "DailySummaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    SummaryDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    TotalBills = table.Column<int>(type: "INTEGER", nullable: false),
                    TotalRevenue = table.Column<decimal>(type: "TEXT", nullable: false),
                    TotalTax = table.Column<decimal>(type: "TEXT", nullable: false),
                    TotalDiscount = table.Column<decimal>(type: "TEXT", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DailySummaries", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "BillItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    BillId = table.Column<int>(type: "INTEGER", nullable: false),
                    CatalogItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    ItemName = table.Column<string>(type: "TEXT", nullable: false),
                    Quantity = table.Column<int>(type: "INTEGER", nullable: false),
                    UnitPrice = table.Column<decimal>(type: "TEXT", nullable: false),
                    LineTotal = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BillItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BillItems_Bills_BillId",
                        column: x => x.BillId,
                        principalTable: "Bills",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "CatalogItems",
                columns: new[] { "Id", "CatalogType", "CreatedAt", "Description", "IsActive", "Name", "Price", "UpdatedAt" },
                values: new object[,]
                {
                    { 1, "entrance", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6702), "Full Price Entry", true, "Adult Ticket", 500m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6708) },
                    { 2, "entrance", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6716), "Children below 12 years", true, "Child Ticket", 250m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6717) },
                    { 3, "entrance", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6719), "Age 60+", true, "Senior Ticket", 300m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6719) },
                    { 4, "entrance", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6720), "Premium Access", true, "VIP Ticket", 1000m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6721) },
                    { 5, "donation", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6762), "₹100 Donation", true, "Small Donation", 100m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6762) },
                    { 6, "donation", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6764), "₹500 Donation", true, "Medium Donation", 500m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6765) },
                    { 7, "donation", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6766), "₹1000 Donation", true, "Large Donation", 1000m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6766) },
                    { 8, "product", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6787), "Event Merchandise", true, "T-Shirt", 300m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6788) },
                    { 9, "product", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6790), "Hot Beverage", true, "Coffee", 100m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6790) },
                    { 10, "product", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6792), "Reusable Bottle", true, "Water Bottle", 150m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6792) },
                    { 11, "product", new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6793), "Assorted Snacks", true, "Snack Pack", 200m, new DateTime(2026, 4, 4, 5, 51, 20, 957, DateTimeKind.Utc).AddTicks(6794) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_BillItems_BillId",
                table: "BillItems",
                column: "BillId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AuditLogs");

            migrationBuilder.DropTable(
                name: "BillItems");

            migrationBuilder.DropTable(
                name: "CatalogItems");

            migrationBuilder.DropTable(
                name: "DailySummaries");

            migrationBuilder.DropTable(
                name: "Bills");
        }
    }
}
