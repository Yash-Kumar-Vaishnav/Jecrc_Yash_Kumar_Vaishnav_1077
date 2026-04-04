# 💼 Multi-Catalog Bill Generator System

A comprehensive full-stack application for managing bills, invoices, and catalogs with real-time calculations and reporting features.

## 📋 Features

### 1. **Multi-Catalog Management**
- ✅ Entrance Fee Catalog (Adult, Child, Senior, VIP)
- ✅ Donation Catalog (Pre-set amounts + custom)
- ✅ Selling Price Catalog (Products with variable pricing)
- ✅ Custom Items (Add completely custom items)

### 2. **Bill/Invoice Operations**
- ✅ Create new bills from any catalog
- ✅ Add/delete items dynamically
- ✅ Edit quantities and prices
- ✅ Apply discounts (percentage or fixed amount)
- ✅ Calculate taxes automatically
- ✅ Generate unique invoice numbers
- ✅ Track date and time

### 3. **User Experience**
- ✅ Switch between catalogs seamlessly
- ✅ Real-time total calculation
- ✅ Print-friendly invoice layout
- ✅ Save/load draft bills
- ✅ Search and filter past bills
- ✅ Responsive design (works on tablet)

### 4. **Data Management**
- ✅ Local SQLite database
- ✅ Export bills as PDF/CSV
- ✅ Daily sales summary
- ✅ Catalog item management

### 5. **Reports & Analytics**
- ✅ Daily summary reports
- ✅ Date range analysis
- ✅ Monthly revenue tracking
- ✅ Tax and discount tracking

---

## 🏗️ Project Structure

```
BillGeneratorSystem/
├── Backend/
│   ├── Controllers/
│   │   └── ApiControllers.cs
│   ├── Data/
│   │   └── BillGeneratorDbContext.cs
│   ├── Migrations/
│   │   └── 20240101000000_InitialCreate.cs
│   ├── Models/
│   │   └── Models.cs
│   ├── Services/
│   │   ├── BillService.cs
│   │   ├── CatalogService.cs
│   │   └── InvoiceAndReportServices.cs
│   ├── Program.cs
│   ├── BillGeneratorSystem.csproj
│   ├── appsettings.json
│   └── .gitignore
│
├── Frontend-React/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.js
│   │   ├── pages/
│   │   │   ├── BillGenerator.js
│   │   │   ├── BillHistory.js
│   │   │   ├── CatalogManager.js
│   │   │   └── Reports.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   └── billStore.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .gitignore
│   └── public/
│
└── README.md
```

---

## 🛠️ Tech Stack

### Backend
- **Framework**: .NET 8.0 (C#)
- **Database**: SQLite
- **ORM**: Entity Framework Core
- **API**: RESTful API with Swagger
- **PDF Generation**: iTextSharp
- **CSV Export**: CsvHelper

### Frontend
- **Library**: React 18
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Styling**: CSS3 (Custom)
- **Icons**: React Icons
- **Notifications**: React Hot Toast
- **PDF/Print**: jsPDF, html2canvas

---

## 📦 Prerequisites

Before running the application, ensure you have installed:

1. **.NET SDK 8.0** or later
   - Download from: https://dotnet.microsoft.com/download
   - Verify: `dotnet --version`

2. **Node.js 18+** and npm
   - Download from: https://nodejs.org/
   - Verify: `node --version` and `npm --version`

3. **Git** (optional but recommended)
   - Download from: https://git-scm.com/

---

## 🚀 Setup & Installation

### Step 1: Backend Setup

```bash
# Navigate to Backend directory
cd BillGeneratorSystem/Backend

# Restore NuGet packages
dotnet restore

# Apply database migrations (creates SQLite database)
dotnet ef database update

# Build the project
dotnet build
```

**Windows Users - Using Visual Studio:**
1. Open `BillGeneratorSystem.csproj` in Visual Studio
2. Go to Tools → NuGet Package Manager → Package Manager Console
3. Run: `Update-Database`

### Step 2: Frontend Setup

```bash
# Navigate to Frontend-React directory
cd BillGeneratorSystem/Frontend-React

# Install dependencies
npm install

# (Optional) Clear npm cache if issues occur
# npm cache clean --force
# npm install --legacy-peer-deps
```

---

## ▶️ Running the Application

### Method 1: Visual Studio Code (Recommended)

#### Terminal 1 - Backend
```bash
cd BillGeneratorSystem/Backend
dotnet run --urls "https://localhost:5001;http://localhost:5000"
```

Backend will run on:
- HTTP: `http://localhost:5000`
- HTTPS: `https://localhost:5001`
- Swagger UI: `http://localhost:5000/swagger`

#### Terminal 2 - Frontend
```bash
cd BillGeneratorSystem/Frontend-React
npm start
```

Frontend will run on:
- `http://localhost:3000`

### Method 2: Visual Studio 2022

1. **Open Solution**: Open the `.sln` file (if exists) or Backend folder
2. **Set Backend as Startup Project**: Right-click Backend → Set as Startup Project
3. **Press F5** or Click "Run" button
4. **Frontend**: Open new terminal and run `npm start`

### Method 3: Command Line (All Platforms)

**Windows (Command Prompt or PowerShell):**
```bash
# Terminal 1
cd BillGeneratorSystem\Backend
dotnet run

# Terminal 2 (new window)
cd BillGeneratorSystem\Frontend-React
npm start
```

**Linux/Mac (Terminal):**
```bash
# Terminal 1
cd BillGeneratorSystem/Backend
dotnet run

# Terminal 2 (new window)
cd BillGeneratorSystem/Frontend-React
npm start
```

---

## 🔌 API Endpoints

### Catalog Management
```
GET    /api/catalog                    - Get all catalog items
GET    /api/catalog/type/{type}        - Get items by type
GET    /api/catalog/{id}               - Get specific item
POST   /api/catalog                    - Create new item
PUT    /api/catalog/{id}               - Update item
DELETE /api/catalog/{id}               - Delete item
GET    /api/catalog/search/{term}      - Search catalogs
```

### Bill Management
```
POST   /api/bill/create                - Create new bill
GET    /api/bill                       - Get all bills
GET    /api/bill/{id}                  - Get specific bill
GET    /api/bill/date/{date}           - Get bills by date
POST   /api/bill/{billId}/items        - Add item to bill
PUT    /api/bill/{billId}/items/{id}   - Update bill item
DELETE /api/bill/{billId}/items/{id}   - Remove bill item
POST   /api/bill/{billId}/discount     - Apply discount
POST   /api/bill/{billId}/tax          - Set tax percentage
POST   /api/bill/{billId}/complete     - Complete bill
```

### Invoice Export
```
GET    /api/invoice/{billId}/pdf       - Download PDF invoice
GET    /api/invoice/{billId}/csv       - Download CSV export
```

### Reports
```
GET    /api/report/daily/{date}        - Get daily summary
GET    /api/report/range               - Get date range report
GET    /api/report/monthly             - Get monthly revenue
```

---

## 📱 Usage Guide

### Creating a Bill

1. **Navigate to "Create Bill"** (Home page)
2. **Select Catalog Type**: Choose from Entrance, Donation, or Product
3. **Set Quantity**: Enter desired quantity
4. **Optional Custom Price**: Override catalog price
5. **Click "Add"**: Item is added to invoice
6. **Repeat**: Add more items as needed
7. **Apply Discount** (Optional): Enter amount or percentage
8. **Set Tax**: Adjust tax percentage if needed
9. **Complete Bill**: Click "Complete Bill" button

### Managing Catalog

1. **Navigate to "Catalog"**
2. **Select Type**: Choose catalog type
3. **Add New Item**: Fill form and click "Add Item"
4. **Edit Item**: Click "Edit" button and update details
5. **Save Changes**: Click "Save" button

### Viewing Reports

1. **Navigate to "Reports"**
2. **Select Report Type**: Daily, Range, or Monthly
3. **Choose Dates**: Select appropriate date range
4. **View Results**: Statistics displayed in cards and tables

### Viewing Bill History

1. **Navigate to "History"**
2. **Search Bills**: Use search box to find specific bills
3. **View Details**: Click bill to see full details
4. **Download**: Export as PDF or CSV

---

## 🗄️ Database Details

### Database File Location
- **Default**: `BillGeneratorSystem/Backend/billgenerator.db`
- **Connection String**: `Data Source=billgenerator.db`

### Tables Created
1. **CatalogItems** - Catalog items with pricing
2. **Bills** - Bill/invoice records
3. **BillItems** - Individual items in bills
4. **DailySummaries** - Daily sales summaries
5. **AuditLogs** - Audit trail

### Seeded Data
Pre-populated catalog items:
- **Entrance**: Adult (₹500), Child (₹250), Senior (₹300), VIP (₹1000)
- **Donation**: Small (₹100), Medium (₹500), Large (₹1000)
- **Products**: T-Shirt (₹300), Coffee (₹100), Water Bottle (₹150), Snacks (₹200)

---

## 🎨 UI Features

### Responsive Design
- ✅ Works on Desktop, Tablet, Mobile
- ✅ Gradient backgrounds
- ✅ Smooth animations
- ✅ Intuitive layout

### Color Scheme
- **Primary**: Purple gradient (#667eea → #764ba2)
- **Success**: Green (#4caf50)
- **Danger**: Red (#f44336)
- **Warning**: Orange
- **Info**: Blue

---

## 🐛 Troubleshooting

### Backend Issues

**Port Already in Use**
```bash
# Windows - Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>
```

**Database Connection Error**
```bash
# Delete existing database and recreate
cd Backend
rm billgenerator.db
dotnet ef database update
```

**Missing Dependencies**
```bash
dotnet restore --no-cache
```

### Frontend Issues

**Port Already in Use**
```bash
# Use different port
PORT=3001 npm start
```

**Dependencies Error**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**CORS Issues**
- Ensure backend is running on http://localhost:5000
- Check CORS settings in `Program.cs`

---

## 📝 Default Credentials

No authentication is configured by default. The application is designed for local use.

To add authentication:
1. Add authentication middleware in `Program.cs`
2. Implement JWT tokens
3. Update API controllers with `[Authorize]` attributes

---

## 🔒 Security Notes

For production deployment:
1. ✅ Enable HTTPS only
2. ✅ Implement authentication & authorization
3. ✅ Use PostgreSQL/SQL Server instead of SQLite
4. ✅ Add input validation
5. ✅ Implement rate limiting
6. ✅ Add comprehensive logging
7. ✅ Use environment variables for secrets

---

## 📚 Additional Resources

### .NET Core Documentation
- https://docs.microsoft.com/dotnet/
- https://learn.microsoft.com/aspnet/

### React Documentation
- https://react.dev/
- https://reactrouter.com/

### Entity Framework Core
- https://learn.microsoft.com/ef/core/

### Frontend Libraries
- Zustand: https://github.com/pmndrs/zustand
- Axios: https://axios-http.com/
- React Icons: https://react-icons.github.io/react-icons/

---

## 🤝 Contributing

Feel free to fork, modify, and improve this project!

---

## 📄 License

This project is open source and available for educational and commercial use.

---

## 📞 Support

For issues and questions:
1. Check the Troubleshooting section
2. Review API endpoint documentation
3. Check console for error messages
4. Verify all prerequisites are installed

---

## 🎯 Future Enhancements

- [ ] User authentication & authorization
- [ ] Advanced analytics dashboard
- [ ] Payment gateway integration
- [ ] Email invoice delivery
- [ ] Mobile app (React Native)
- [ ] Dark mode support
- [ ] Multi-currency support
- [ ] Inventory management
- [ ] Customer loyalty programs
- [ ] WhatsApp invoice delivery

---

## ✨ Version History

**v1.0.0** (Initial Release)
- Core bill generation functionality
- Catalog management
- PDF/CSV export
- Daily reports
- Responsive UI

---

**Created with ❤️ for seamless billing operations**
