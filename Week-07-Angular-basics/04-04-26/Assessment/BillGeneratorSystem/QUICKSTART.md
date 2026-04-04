# 🚀 Quick Start Guide

Get the Bill Generator System up and running in 5 minutes!

---

## ⚡ 30-Second Setup

### Prerequisites Check
```bash
# Verify .NET 8.0
dotnet --version

# Verify Node.js 18+
node --version
npm --version
```

### One-Command Setup

**Windows (Command Prompt):**
```batch
REM Terminal 1 - Backend
cd BillGeneratorSystem\Backend
dotnet restore
dotnet ef database update
dotnet run

REM Terminal 2 - Frontend
cd BillGeneratorSystem\Frontend-React
npm install
npm start
```

**Linux/Mac (Terminal):**
```bash
# Terminal 1 - Backend
cd BillGeneratorSystem/Backend
dotnet restore
dotnet ef database update
dotnet run

# Terminal 2 - Frontend
cd BillGeneratorSystem/Frontend-React
npm install
npm start
```

---

## 📖 Step-by-Step Commands

### Terminal 1: Backend Setup & Run

```bash
# Navigate to backend
cd BillGeneratorSystem/Backend

# Restore dependencies (one-time)
dotnet restore

# Create database (one-time)
dotnet ef database update

# Run backend
dotnet run
```

**Expected Output:**
```
info: Microsoft.Hosting.Lifetime[14]
      Now listening on: http://localhost:5000
      Now listening on: https://localhost:5001
```

**Verify Backend:**
- Open: http://localhost:5000/swagger
- You should see API documentation

### Terminal 2: Frontend Setup & Run

```bash
# Navigate to frontend
cd BillGeneratorSystem/Frontend-React

# Install dependencies (one-time)
npm install

# Start development server
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view bill-generator-react in the browser.

  Local:   http://localhost:3000
```

**Browser opens automatically to http://localhost:3000**

---

## ✅ Verification

### Backend Running?
```bash
curl http://localhost:5000/api/catalog
```

Should return JSON array of catalog items.

### Frontend Running?
- Browser should display Bill Generator System UI
- No console errors in browser DevTools

### API Connected?
1. Open http://localhost:3000
2. Go to "Create Bill"
3. You should see catalog items in dropdown
4. If items load → Everything works! ✅

---

## 🎯 Common Commands

### Backend Commands

```bash
# Run backend
cd BillGeneratorSystem/Backend
dotnet run

# Run in release mode
dotnet run --configuration Release

# Run on specific port
dotnet run --urls "http://localhost:5555"

# Create new database migration
dotnet ef migrations add MigrationName

# Apply database updates
dotnet ef database update

# View database migrations
dotnet ef migrations list

# Remove last migration
dotnet ef migrations remove

# Drop database
dotnet ef database drop

# Rebuild project
dotnet build

# Clean build files
dotnet clean
```

### Frontend Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# List installed packages
npm list

# Update packages
npm update

# Clear npm cache
npm cache clean --force

# Remove node_modules (nuclear option)
rm -rf node_modules package-lock.json
npm install
```

---

## 🔧 Troubleshooting Quick Fixes

### Backend Won't Start

**Port 5000 in use?**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :5000
kill -9 <PID>

# Use different port
dotnet run --urls "http://localhost:5555"
```

**Database error?**
```bash
rm billgenerator.db
dotnet ef database update
```

**Missing packages?**
```bash
dotnet restore --no-cache
```

### Frontend Won't Start

**Port 3000 in use?**
```bash
PORT=3001 npm start
```

**Dependencies error?**
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

**Build error?**
```bash
npm install --legacy-peer-deps
npm start
```

### CORS Errors

**Issue:** Frontend can't reach backend

**Solution:**
1. Verify backend runs on http://localhost:5000
2. Check `src/services/api.js` has correct URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000/api';
   ```
3. Restart both servers

---

## 📋 Checklist Before Use

- [ ] .NET SDK 8.0+ installed
- [ ] Node.js 18+ installed
- [ ] Both terminals open (one for backend, one for frontend)
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:3000
- [ ] Can access http://localhost:5000/swagger
- [ ] Browser shows Bill Generator UI
- [ ] No errors in console

---

## 🎓 First Steps After Launch

1. **Create a Bill**
   - Go to "Create Bill"
   - Select "Entrance Fees"
   - Click "Add" on Adult Ticket
   - See bill updated in right panel
   - Click "Complete Bill"

2. **View History**
   - Go to "History"
   - Click on bill to see details
   - Download as PDF

3. **Manage Catalog**
   - Go to "Catalog"
   - Add new item
   - Update prices

4. **View Reports**
   - Go to "Reports"
   - Select date range
   - View statistics

---

## 📱 Development Workflow

### During Development

```bash
# Terminal 1: Backend (auto-reload)
cd BillGeneratorSystem/Backend
dotnet run

# Terminal 2: Frontend (hot reload)
cd BillGeneratorSystem/Frontend-React
npm start

# Terminal 3 (Optional): Run tests
npm test
```

Both servers auto-reload when you change code.

### When Done

```bash
# Stop backend: Press Ctrl+C in Terminal 1
# Stop frontend: Press Ctrl+C in Terminal 2
```

---

## 🚀 Deploying to Production

### Frontend Deployment

```bash
# Build optimized bundle
npm run build

# Creates 'build/' folder ready to deploy
# Deploy to Netlify, Vercel, or any static host
```

### Backend Deployment

```bash
# Publish release build
dotnet publish -c Release -o ./publish

# Creates 'publish/' folder
# Deploy to Azure, AWS, or any server
```

---

## 📞 Need Help?

### Check These First

1. **All prerequisites installed?**
   ```bash
   dotnet --version
   node --version
   npm --version
   ```

2. **Ports available?**
   ```bash
   # Windows
   netstat -ano | findstr ":5000 :3000"
   
   # Linux/Mac
   lsof -i :5000
   lsof -i :3000
   ```

3. **API responding?**
   ```bash
   curl http://localhost:5000/api/catalog
   ```

4. **Console errors?**
   - Backend: Check terminal output
   - Frontend: Open DevTools (F12) → Console

### Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Port in use | Kill process or use different port |
| Dependencies error | Delete node_modules, run npm install |
| Database error | Delete .db file, run migration |
| CORS error | Restart backend, check API URL |
| Blank page | Check browser console for errors |
| No catalog items | Backend not running or API error |

---

## 📞 Support Resources

- **Documentation**: See `README.md`
- **Backend Guide**: See `BACKEND_SETUP.md`
- **Frontend Guide**: See `FRONTEND_SETUP.md`
- **API Docs**: http://localhost:5000/swagger

---

**That's it! You're ready to generate bills! 💼**

```
╔════════════════════════════════════════╗
║  Backend: http://localhost:5000        ║
║  Frontend: http://localhost:3000       ║
║  Swagger: http://localhost:5000/swagger║
╚════════════════════════════════════════╝
```
