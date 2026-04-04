# Backend Setup Guide - .NET Core

## 📋 Prerequisites

1. **.NET SDK 8.0 or later**
   - Download: https://dotnet.microsoft.com/download/dotnet/8.0
   - Verify installation: `dotnet --version`

2. **Visual Studio 2022** (Optional but recommended)
   - Download: https://visualstudio.microsoft.com/
   - Or use **Visual Studio Code** with C# extension

---

## 🔧 Installation Steps

### Step 1: Install .NET SDK

```bash
# Verify .NET is installed
dotnet --version
dotnet --info

# Should output .NET 8.0 or later
```

### Step 2: Navigate to Backend Directory

```bash
cd BillGeneratorSystem/Backend
```

### Step 3: Restore NuGet Packages

```bash
dotnet restore
```

This downloads all required NuGet packages:
- Microsoft.EntityFrameworkCore
- Microsoft.EntityFrameworkCore.Sqlite
- Swashbuckle.AspNetCore (Swagger)
- iTextSharp (PDF generation)
- CsvHelper (CSV export)

### Step 4: Create & Apply Database

**Option A: Using dotnet CLI**
```bash
# Create and apply migrations
dotnet ef database update

# This creates: billgenerator.db
```

**Option B: Using Visual Studio Package Manager Console**
```
Tools → NuGet Package Manager → Package Manager Console

Run: Update-Database
```

### Step 5: Build the Project

```bash
dotnet build
```

---

## ▶️ Running the Backend

### Option 1: Using dotnet CLI

```bash
# Development mode with hot reload
dotnet run

# OR specify ports explicitly
dotnet run --urls "https://localhost:5001;http://localhost:5000"

# OR release mode
dotnet run --configuration Release
```

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: https://localhost:5001
```

### Option 2: Using Visual Studio 2022

1. Open **BillGeneratorSystem.csproj**
2. Right-click project → **Set as Startup Project**
3. Press **F5** or click **Run**

### Option 3: Using Visual Studio Code

```bash
# Install C# extension first
# Then press F5 to start debugging
```

---

## 🧪 Testing the API

### Using Swagger UI

**URL**: `http://localhost:5000/swagger`

Features:
- Interactive API documentation
- Test all endpoints directly
- View request/response examples
- Auto-generated from code

### Using cURL

```bash
# Get all catalog items
curl http://localhost:5000/api/catalog

# Create new bill
curl -X POST http://localhost:5000/api/bill/create

# Get specific bill
curl http://localhost:5000/api/bill/1
```

### Using Postman

1. Download: https://www.postman.com/downloads/
2. Import API endpoints
3. Create collection of requests
4. Test each endpoint

**Example Requests:**

**GET - Catalog Items**
```
Method: GET
URL: http://localhost:5000/api/catalog
```

**POST - Create Bill**
```
Method: POST
URL: http://localhost:5000/api/bill/create
```

**POST - Add Item to Bill**
```
Method: POST
URL: http://localhost:5000/api/bill/1/items
Content-Type: application/json

Body:
{
  "catalogItemId": 1,
  "quantity": 2,
  "unitPrice": 500
}
```

---

## 📁 Project Structure

```
Backend/
├── Controllers/
│   └── ApiControllers.cs
│       ├── CatalogController
│       ├── BillController
│       ├── InvoiceController
│       └── ReportController
│
├── Data/
│   └── BillGeneratorDbContext.cs
│       - Database configuration
│       - Entity relationships
│       - Seed data
│
├── Models/
│   └── Models.cs
│       ├── CatalogItem
│       ├── Bill
│       ├── BillItem
│       ├── DailySummary
│       └── AuditLog
│
├── Services/
│   ├── CatalogService.cs
│   │   - Catalog CRUD operations
│   │   - Search functionality
│   │
│   ├── BillService.cs
│   │   - Bill management
│   │   - Item operations
│   │   - Calculations
│   │
│   └── InvoiceAndReportServices.cs
│       ├── InvoiceService
│       │   - PDF generation
│       │   - CSV export
│       └── ReportService
│           - Summary reports
│           - Revenue analytics
│
├── Migrations/
│   └── 20240101000000_InitialCreate.cs
│       - Database schema
│       - Seed data
│
├── Program.cs
│   - Application setup
│   - Service registration
│   - Middleware configuration
│   - CORS setup
│
├── appsettings.json
│   - Configuration
│   - Connection strings
│   - Logging
│
├── BillGeneratorSystem.csproj
│   - Project file
│   - Dependencies
│   - Build settings
│
└── billgenerator.db
    - SQLite database (created after migration)
```

---

## 🔌 API Endpoints Summary

### Catalog Endpoints
```
GET    /api/catalog                    - All items
GET    /api/catalog/type/{type}        - Items by type
GET    /api/catalog/{id}               - Single item
POST   /api/catalog                    - Create item
PUT    /api/catalog/{id}               - Update item
DELETE /api/catalog/{id}               - Delete item
GET    /api/catalog/search/{term}      - Search items
```

### Bill Endpoints
```
POST   /api/bill/create                - New bill
GET    /api/bill                       - All bills
GET    /api/bill/{id}                  - Single bill
GET    /api/bill/date/{date}           - Bills by date
POST   /api/bill/{billId}/items        - Add item
PUT    /api/bill/{billId}/items/{id}   - Update item
DELETE /api/bill/{billId}/items/{id}   - Remove item
POST   /api/bill/{billId}/discount     - Apply discount
POST   /api/bill/{billId}/tax          - Set tax
POST   /api/bill/{billId}/complete     - Complete bill
POST   /api/bill/search                - Search bills
```

### Invoice Endpoints
```
GET    /api/invoice/{billId}/pdf       - PDF download
GET    /api/invoice/{billId}/csv       - CSV download
```

### Report Endpoints
```
GET    /api/report/daily/{date}        - Daily summary
GET    /api/report/range               - Range report
GET    /api/report/monthly             - Monthly revenue
```

---

## 🗄️ Database Details

### Connection String
```
Data Source=billgenerator.db
```

**Modify in appsettings.json:**
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=billgenerator.db"
  }
}
```

### Tables

**CatalogItems**
```sql
- Id (PK)
- Name
- Description
- Price
- CatalogType (entrance, donation, product)
- IsActive
- CreatedAt
- UpdatedAt
```

**Bills**
```sql
- Id (PK)
- InvoiceNumber (unique)
- CreatedAt
- UpdatedAt
- Status (Draft, Completed, Cancelled, Paid)
- SubTotal
- TaxPercentage
- TaxAmount
- DiscountAmount
- DiscountPercentage
- Total
- Notes
```

**BillItems**
```sql
- Id (PK)
- BillId (FK)
- CatalogItemId
- ItemName
- Quantity
- UnitPrice
- LineTotal
```

**DailySummaries**
```sql
- Id (PK)
- SummaryDate
- TotalBills
- TotalRevenue
- TotalTax
- TotalDiscount
- CreatedAt
```

---

## 🔄 Database Migrations

### View Migration History

```bash
dotnet ef migrations list
```

### Add New Migration

```bash
dotnet ef migrations add MigrationName
```

### Revert Last Migration

```bash
dotnet ef migrations remove
```

### Update Database with Latest Migration

```bash
dotnet ef database update
```

### Drop Database

```bash
dotnet ef database drop
```

---

## 🐛 Troubleshooting

### Issue: Port 5000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -i :5000
kill -9 <PID>
```

**Solution:**
```bash
dotnet run --urls "http://localhost:5555"
```

### Issue: Database Connection Error

```bash
# Delete database and recreate
rm billgenerator.db
dotnet ef database update
```

### Issue: NuGet Packages Not Found

```bash
# Clear cache and restore
dotnet nuget locals all --clear
dotnet restore --no-cache
```

### Issue: Migration Errors

```bash
# Remove last migration
dotnet ef migrations remove

# Apply existing migrations
dotnet ef database update
```

### Issue: CORS Errors from Frontend

**Check Program.cs:**
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", builder =>
    {
        builder.WithOrigins("http://localhost:3000")
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});
```

---

## 📊 Performance Tips

1. **Use Connection Pooling**
   ```csharp
   optionsBuilder.UseSqlite("connection_string", options =>
   {
       options.CommandTimeout(30);
   });
   ```

2. **Add Database Indexes**
   ```csharp
   modelBuilder.Entity<Bill>()
       .HasIndex(b => b.InvoiceNumber)
       .IsUnique();
   ```

3. **Use Async Operations**
   - Always use `.ToListAsync()` instead of `.ToList()`
   - Use `await` for database operations

4. **Implement Caching**
   ```csharp
   services.AddMemoryCache();
   services.AddDistributedMemoryCache();
   ```

---

## 🔐 Security Checklist

- [ ] Change default connection string in production
- [ ] Enable HTTPS only in production
- [ ] Add authentication/authorization
- [ ] Validate all user inputs
- [ ] Use parameterized queries (EF Core does this)
- [ ] Add rate limiting
- [ ] Enable CORS only for trusted origins
- [ ] Log security events
- [ ] Use environment variables for secrets
- [ ] Regular database backups

---

## 📈 Monitoring & Logging

### Enable Detailed Logging

**appsettings.json:**
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.EntityFrameworkCore": "Information"
    }
  }
}
```

### View Logs

Console output shows:
- Request details
- Database queries (with detailed logging)
- Exception stack traces
- Performance metrics

---

## 🎓 Learning Resources

- **Entity Framework Core**: https://learn.microsoft.com/ef/core/
- **.NET Documentation**: https://docs.microsoft.com/dotnet/
- **REST API Best Practices**: https://restfulapi.net/
- **C# Documentation**: https://learn.microsoft.com/en-us/dotnet/csharp/

---

## ✅ Verification Checklist

After setup, verify:

- [ ] .NET 8.0 installed: `dotnet --version`
- [ ] Dependencies restored: `dotnet restore`
- [ ] Database created: Check for `billgenerator.db`
- [ ] Backend runs: `dotnet run`
- [ ] Swagger accessible: `http://localhost:5000/swagger`
- [ ] GET /api/catalog returns data
- [ ] POST /api/bill/create returns new bill
- [ ] No CORS errors in console

---

**Backend is ready when you see:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
```
