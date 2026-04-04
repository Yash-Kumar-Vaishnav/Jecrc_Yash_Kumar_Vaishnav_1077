# Frontend Setup Guide - React

## 📋 Prerequisites

1. **Node.js 18 or later**
   - Download: https://nodejs.org/
   - Verify: `node --version` (should be v18+)
   - npm comes with Node.js

2. **npm (Node Package Manager)**
   - Comes with Node.js
   - Verify: `npm --version`

3. **Code Editor** (Optional)
   - Visual Studio Code: https://code.visualstudio.com/
   - WebStorm: https://www.jetbrains.com/webstorm/

---

## 🔧 Installation Steps

### Step 1: Install Node.js

```bash
# Download and install from https://nodejs.org/

# Verify installation
node --version
npm --version
```

### Step 2: Navigate to Frontend Directory

```bash
cd BillGeneratorSystem/Frontend-React
```

### Step 3: Install Dependencies

```bash
npm install
```

**This installs:**
- React 18
- React Router v6
- Axios (HTTP client)
- Zustand (State management)
- React Icons
- React Hot Toast
- And other dependencies

**Expected Time:** 2-5 minutes

### Step 4: Verify Installation

```bash
npm list react
npm list react-router-dom
npm list axios
```

---

## ▶️ Running the Frontend

### Start Development Server

```bash
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view bill-generator-react in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000

Note that the development build is not optimized.
```

**Automatic Actions:**
- Opens browser to `http://localhost:3000`
- Hot reload enabled (changes reflect instantly)
- Webpack dev server runs

### Stop Development Server

```
Press: Ctrl + C (Windows/Linux) or Cmd + C (Mac)
```

---

## 📁 Project Structure

```
Frontend-React/
├── public/
│   ├── index.html              - Main HTML file
│   └── favicon.ico
│
├── src/
│   ├── components/
│   │   └── Navbar.js           - Navigation component
│   │
│   ├── pages/
│   │   ├── BillGenerator.js    - Main billing page
│   │   ├── BillHistory.js      - View past bills
│   │   ├── CatalogManager.js   - Manage catalog items
│   │   └── Reports.js          - Analytics & reports
│   │
│   ├── services/
│   │   └── api.js              - API service layer
│   │       ├── catalogAPI
│   │       ├── billAPI
│   │       ├── invoiceAPI
│   │       └── reportAPI
│   │
│   ├── store/
│   │   └── billStore.js        - Zustand state management
│   │       ├── Bills state
│   │       ├── Catalogs state
│   │       └── Actions
│   │
│   ├── App.js                  - Root component
│   ├── App.css                 - Global styles
│   ├── index.js                - Entry point
│   ├── index.css               - Global CSS
│   │
│   └── .gitignore
│
├── package.json                - Dependencies & scripts
├── .gitignore
└── node_modules/               - Dependencies (auto-created)
```

---

## 📦 Key Dependencies

### Core
- **react** (18.2.0) - UI library
- **react-dom** (18.2.0) - DOM rendering
- **react-router-dom** (6.18.0) - Routing

### State & Data
- **zustand** (4.4.0) - State management
- **axios** (1.6.0) - HTTP client

### UI & UX
- **react-icons** (4.12.0) - Icon library
- **react-hot-toast** (2.4.1) - Notifications

### Export & Print
- **jspdf** (2.5.1) - PDF generation
- **html2canvas** (1.4.1) - HTML to image

### Utilities
- **date-fns** (2.30.0) - Date utilities

---

## 🎨 Available Scripts

### `npm start`
Runs the app in development mode.
- Opens [http://localhost:3000](http://localhost:3000)
- Hot reload enabled
- Shows linting errors in console

### `npm run build`
Builds the app for production.
- Optimizes bundle size
- Creates `build/` folder
- Ready for deployment

### `npm test`
Runs the test suite in interactive watch mode.

### `npm run eject`
⚠️ **Warning**: One-way operation!
- Exposes webpack configuration
- Cannot be undone
- Use only if you need custom configuration

---

## 🔌 API Integration

### API Configuration

**File:** `src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

**Ensure Backend is Running:**
```bash
# Terminal 1 - Backend
cd BillGeneratorSystem/Backend
dotnet run

# Terminal 2 - Frontend
cd BillGeneratorSystem/Frontend-React
npm start
```

### API Service Methods

```javascript
// Catalog
catalogAPI.getAll()
catalogAPI.getByType(type)
catalogAPI.getById(id)
catalogAPI.create(item)
catalogAPI.update(id, item)
catalogAPI.delete(id)
catalogAPI.search(term)

// Bill
billAPI.create()
billAPI.getAll()
billAPI.getById(id)
billAPI.getByDate(date)
billAPI.addItem(billId, data)
billAPI.updateItem(billId, itemId, data)
billAPI.removeItem(billId, itemId)
billAPI.applyDiscount(billId, data)
billAPI.setTax(billId, data)
billAPI.complete(billId)

// Invoice
invoiceAPI.generatePdf(billId)
invoiceAPI.generateCsv(billId)

// Report
reportAPI.getDailySummary(date)
reportAPI.getRange(startDate, endDate)
reportAPI.getMonthlyRevenue(month, year)
```

---

## 🎯 Pages Overview

### 1. Bill Generator (Home Page)
**Route:** `/`

Features:
- Select catalog items
- Add/remove items
- Apply discounts
- Set tax percentage
- Complete bill
- Download PDF

### 2. Bill History
**Route:** `/history`

Features:
- View all completed bills
- Search bills
- View bill details
- Download PDF/CSV
- Filter by date

### 3. Catalog Manager
**Route:** `/catalog`

Features:
- Add new catalog items
- Edit existing items
- Delete items
- Filter by type
- Manage pricing

### 4. Reports
**Route:** `/reports`

Features:
- Daily summary
- Date range analysis
- Monthly revenue
- Tax tracking
- Statistics cards

---

## 🔄 State Management (Zustand)

### Store File
**Location:** `src/store/billStore.js`

### Available Actions

```javascript
// Bill Operations
createBill()                    // Create new bill
getBill(id)                     // Get single bill
getAllBills()                   // Get all bills
addItem(...)                    // Add item to bill
updateItem(...)                 // Update bill item
removeItem(...)                 // Remove item
applyDiscount(...)              // Apply discount
setTax(...)                     // Set tax
completeBill(...)               // Complete bill

// Catalog Operations
loadCatalogs()                  // Load all catalogs
addCatalogItem(...)             // Add new item
updateCatalogItem(...)          // Update item

// Utilities
clearError()                    // Clear error messages
```

### Usage Example

```javascript
import { useBillStore } from '../store/billStore';

function MyComponent() {
  const { currentBill, createBill } = useBillStore();
  
  useEffect(() => {
    if (!currentBill) {
      createBill();
    }
  }, []);
  
  return <div>{currentBill?.invoiceNumber}</div>;
}
```

---

## 🎨 Styling

### Global Styles
**File:** `src/App.css`

Contains:
- Navbar styles
- Card & layout
- Form styles
- Button styles
- Table styles
- Responsive design

### CSS Variables Used

```css
/* Colors */
Primary: #667eea (purple)
Secondary: #764ba2 (dark purple)
Success: #4caf50 (green)
Danger: #f44336 (red)
Warning: #ff9800 (orange)
Info: #2196f3 (blue)

/* Spacing */
Padding: 0.75rem, 1rem, 1.5rem, 2rem
Margin: standard with rem units

/* Border Radius */
Small: 4px
Medium: 6px
Large: 8px
Full: 12px
```

### Customizing Styles

1. **Global colors**: Edit variables in `App.css`
2. **Component-specific**: Inline styles or CSS modules
3. **Responsive**: Media queries for mobile/tablet

---

## 📱 Responsive Design

### Breakpoints

```css
Mobile: < 768px
Tablet: 768px - 1024px
Desktop: > 1024px
```

### Grid System

```javascript
// 1 column on mobile, 2 on larger screens
<div className="grid grid-2">

// 1 column on mobile, 3 on larger screens
<div className="grid grid-3">
```

---

## 🐛 Troubleshooting

### Issue: Port 3000 Already in Use

**Solution 1:** Use different port
```bash
PORT=3001 npm start
```

**Solution 2:** Kill process on port 3000

Windows:
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

Linux/Mac:
```bash
lsof -i :3000
kill -9 <PID>
```

### Issue: Dependencies Not Installed

```bash
# Clear cache
npm cache clean --force

# Remove node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: npm install Fails

```bash
# Try with legacy peer deps
npm install --legacy-peer-deps

# Or use npm 7+ with force
npm install --force
```

### Issue: CORS Error from Backend

**Error:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Ensure backend is running on `http://localhost:5000`
2. Check `Program.cs` CORS configuration
3. Verify API_BASE_URL in `src/services/api.js`

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

### Issue: Hot Reload Not Working

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear webpack cache
npm start -- --reset-cache
```

### Issue: Build Errors

```bash
# Check syntax
npm list

# Install missing dependencies
npm install

# Clear build cache
npm run build -- --reset-cache
```

---

## 🚀 Building for Production

### Create Production Build

```bash
npm run build
```

**Creates:**
- Optimized bundle in `build/` folder
- Minified CSS and JavaScript
- Source maps for debugging
- ~50KB gzipped bundle

### Deploy Build

**Option 1: Netlify**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

**Option 2: Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**Option 3: GitHub Pages**
```bash
# Add to package.json
"homepage": "https://username.github.io/repo-name"

# Deploy
npm run build
npm install gh-pages --save-dev
```

**Option 4: Docker**
```dockerfile
FROM node:18 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 📊 Performance Optimization

### Code Splitting
```javascript
import { lazy, Suspense } from 'react';

const BillHistory = lazy(() => import('./pages/BillHistory'));

<Suspense fallback={<div>Loading...</div>}>
  <BillHistory />
</Suspense>
```

### Memoization
```javascript
import { useMemo } from 'react';

const memoizedValue = useMemo(() => {
  return expensiveCalculation(a, b);
}, [a, b]);
```

### Image Optimization
```javascript
// Use lazy loading
<img loading="lazy" src="image.jpg" alt="description" />
```

---

## 🔐 Security

- ✅ Input validation on forms
- ✅ Sanitize user input
- ✅ HTTPS only in production
- ✅ Secure HTTP headers
- ✅ Content Security Policy (CSP)
- ✅ XSS protection
- ✅ CSRF tokens (if needed)

---

## 📚 Learning Resources

- **React**: https://react.dev/
- **React Router**: https://reactrouter.com/
- **Zustand**: https://github.com/pmndrs/zustand
- **Axios**: https://axios-http.com/
- **CSS**: https://developer.mozilla.org/en-US/docs/Web/CSS
- **JavaScript**: https://javascript.info/

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Node.js installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Dependencies installed: `npm install`
- [ ] Backend running on port 5000
- [ ] Frontend runs: `npm start`
- [ ] Browser opens to `http://localhost:3000`
- [ ] No console errors
- [ ] API calls work (check Network tab)
- [ ] Styles load correctly
- [ ] Responsive design works

---

**Frontend is ready when you see:**
```
Compiled successfully!

You can now view bill-generator-react in the browser.
  Local: http://localhost:3000
```
