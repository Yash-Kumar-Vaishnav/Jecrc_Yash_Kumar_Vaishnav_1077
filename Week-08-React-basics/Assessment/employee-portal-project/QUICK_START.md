# 🚀 Quick Start Guide - Step by Step

## Prerequisites Check

### Step 1: Verify Node.js is Installed

Open your terminal/command prompt and run:

```bash
node --version
npm --version
```

**Expected Output:**
```
v18.0.0 (or higher)
9.0.0 (or higher)
```

**Don't have Node.js?**
- Download from: https://nodejs.org/
- Choose LTS (Long Term Support) version
- Install and restart your terminal

---

## Installation & Setup

### Step 2: Extract/Navigate to Project Folder

**Option A: If you have a ZIP file**
1. Right-click the ZIP file → Extract All
2. Open the extracted `employee-portal-project` folder

**Option B: Using command line**
```bash
cd ~/Downloads/employee-portal-project
# or wherever your folder is
```

### Step 3: Open in VS Code

**Option A: GUI Method**
1. Open VS Code
2. Click `File` → `Open Folder`
3. Select the `employee-portal-project` folder
4. Click `Open`

**Option B: Command Line Method**
```bash
cd /path/to/employee-portal-project
code .
```

### Step 4: Open Integrated Terminal in VS Code

1. Click `Terminal` menu → `New Terminal`
2. Or press: `Ctrl + `` (backtick)

You should see the terminal at the bottom showing:
```
$ 
```

### Step 5: Install Dependencies

In the VS Code terminal, type:

```bash
npm install
```

**What to expect:**
- It will download ~500 MB of packages
- Takes 2-5 minutes depending on internet speed
- You'll see progress bars and messages
- **Don't close the terminal, let it finish**

**Success indicator:**
```
added XXX packages in XXm XXs
```

### Step 6: Start the Development Server

In the same terminal, type:

```bash
npm start
```

**What to expect:**
1. Webpack will compile the code
2. You'll see: `Compiled successfully!`
3. Browser will automatically open with: `http://localhost:3000`

**If browser doesn't open:**
- Manually open: `http://localhost:3000` in your browser

---

## 🎯 Using the Application

### Login

1. **Email field**: Enter any email (e.g., `user@company.com`)
2. **Password field**: Enter any password (e.g., `password123`)
3. **Click**: "Sign In" button

✅ You should now see the Dashboard

### Dashboard Tabs

#### 📊 Analytics Tab (Default)
- Shows total employees
- Shows active employees count
- Shows employees per department
- Auto-updates when you add/delete employees

#### 👥 Employees Tab
**View existing employees:**
- List of all employees (from database)
- Filter by department using buttons at top
- Edit or Delete options for each employee

**Add new employee:**
1. Click "+ Add Employee" button
2. Fill in the form fields:
   - Name
   - Email
   - Role
   - Department
   - Join Date
3. Click "Create"
4. New employee appears in the list

**Edit employee:**
1. Click "✏️ Edit" on any employee card
2. Form pre-fills with current data
3. Modify any field
4. Click "Update"

**Delete employee:**
1. Click "🗑️ Delete" on any employee card
2. Employee is removed immediately

**Filter employees:**
1. Click department buttons at the top
2. List updates to show only that department
3. Click "All" to see everyone

#### ⚙️ Settings Tab
- Toggle "Email Notifications"
- Toggle "Auto-save"
- Settings are maintained during your session

### Theme Toggle

Click the **🌙** moon icon in the header to:
- Switch to **Dark Mode** (dark theme)
- Click **☀️** sun icon to switch back to **Light Mode**

### Logout

Click **Sign Out** button in the top right to:
- Return to login page
- Clear authentication state

---

## 📱 File Structure Explained

```
employee-portal-project/          ← Your main folder
├── src/
│   ├── App.jsx                   ← Main React component (all logic here)
│   └── index.js                  ← Entry point
├── public/
│   └── index.html                ← HTML template
├── node_modules/                 ← All dependencies (auto-created, don't edit)
├── package.json                  ← Project configuration
├── package-lock.json             ← Dependency lock file (auto-created)
├── README.md                      ← Full documentation
├── QUICK_START.md                ← This file
├── CONTEXT_API_GUIDE.md          ← Advanced documentation
├── ADVANCED_PATTERNS.js          ← Code examples
└── .gitignore                    ← Files to ignore
```

---

## 🎓 Understanding the Code

### Where is the Code?

**All the application logic is in: `src/App.jsx`**

This single file contains:
- 4 Contexts (Auth, Theme, Employee, Dashboard)
- 4 Reducers (pure state logic)
- 4 Providers (state management)
- 8 Components (UI elements)
- Custom hooks and styles

### Code Structure (Reading Order)

1. **Lines 1-20**: Imports and context definitions
2. **Lines 20-80**: Type definitions and initial data
3. **Lines 80-200**: Reducer functions
4. **Lines 200-350**: Provider components
5. **Lines 350-430**: Custom hooks
6. **Lines 430-900**: UI Components
7. **Lines 900+**: Inline styles

---

## 🆘 Common Issues & Solutions

### Issue 1: "npm: command not found"

**Cause**: Node.js not installed
**Solution**: 
1. Download Node.js from https://nodejs.org/
2. Install it
3. Restart your terminal/VS Code
4. Try again

### Issue 2: Port 3000 is Already in Use

**Cause**: Another app is using port 3000
**Error**: `listen EADDRINUSE: address already in use :::3000`

**Solution Option 1**: Use different port
```bash
PORT=3001 npm start
```

**Solution Option 2**: Kill the process on port 3000
```bash
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue 3: "Module not found" Error

**Cause**: Dependencies not installed properly
**Solution**:
```bash
# Delete node_modules
rm -rf node_modules
# or on Windows: rmdir /s /q node_modules

# Clear npm cache
npm cache clean --force

# Reinstall
npm install
```

### Issue 4: Changes Don't Show Up

**Cause**: Browser cached old version
**Solution**:
- Hard refresh: `Ctrl + Shift + R` (Windows/Linux)
- Or: `Cmd + Shift + R` (Mac)
- Or: Open DevTools (F12) → Right-click refresh → "Empty cache and hard refresh"

### Issue 5: Blank White Screen

**Cause**: Compilation error
**Solution**:
1. Check the terminal for error messages
2. Check VS Code console (F12 → Console tab)
3. Fix any syntax errors in `src/App.jsx`

### Issue 6: "Cannot find module" errors

**Cause**: Missing or incomplete npm install
**Solution**:
```bash
npm install
npm start
```

---

## 🛠️ Editing the Code

### How to Make Changes

1. **Open** `src/App.jsx` in VS Code
2. **Edit** any code
3. **Save** (Ctrl + S)
4. **Watch** the browser auto-refresh with your changes

**Hot Reload**:
- Changes save automatically
- Browser updates instantly
- No need to restart `npm start`

### Example: Change Login Text

1. Open `src/App.jsx`
2. Find the line: `<h1 style={styles.loginTitle}>Employee Portal</h1>`
3. Change "Employee Portal" to "Company Dashboard"
4. Save (Ctrl + S)
5. See the change immediately in browser

---

## 📊 Initial Sample Data

The app comes with 3 pre-loaded employees:

| ID | Name | Email | Role | Department |
|---|---|---|---|---|
| 1 | Alice Johnson | alice@company.com | Senior Developer | Engineering |
| 2 | Bob Smith | bob@company.com | Product Manager | Product |
| 3 | Carol Williams | carol@company.com | Designer | Design |

**Note**: Data is in-memory, so it resets when you refresh the page.

---

## ⌨️ Useful VS Code Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + `` | Open/Close terminal |
| `Ctrl + S` | Save file |
| `Ctrl + F` | Find in file |
| `Ctrl + H` | Find and replace |
| `F12` | Open browser DevTools |
| `Ctrl + Shift + R` | Hard refresh browser |

---

## 📚 Next Steps to Learn More

1. **Read** `README.md` for full documentation
2. **Study** `CONTEXT_API_GUIDE.md` for architecture details
3. **Explore** `ADVANCED_PATTERNS.js` for advanced techniques
4. **Modify** the code and experiment
5. **Try** implementing new features

---

## 🎯 Mini Challenges

Try these to practice:

**Challenge 1**: Add a new field to employees (e.g., "Salary")
- Edit the employee card display
- Add to the form when creating employees

**Challenge 2**: Add a "Search" feature
- Filter employees by name/email

**Challenge 3**: Persist data to localStorage
- Save employees to browser storage
- Load on page refresh

**Challenge 4**: Add employee status toggle (Active/Inactive)
- Add toggle button to employee cards
- Filter by status

---

## 🚨 When Something Breaks

1. **Check the terminal** - Look for error messages
2. **Check browser console** - Press F12 → Console tab
3. **Check the code** - Look for typos or syntax errors
4. **Restart everything**:
   ```bash
   # Stop: Press Ctrl + C in terminal
   # Delete: rm -rf node_modules package-lock.json
   # Reinstall: npm install
   # Start: npm start
   ```

---

## ✅ Verification Checklist

After starting the app:

- [ ] Terminal shows "Compiled successfully!"
- [ ] Browser opened at `http://localhost:3000`
- [ ] Login page visible with form
- [ ] Can login with any email/password
- [ ] Dashboard appears after login
- [ ] Can see Analytics tab
- [ ] Can see 3 sample employees
- [ ] Can toggle theme (moon/sun icon)
- [ ] Can add new employee
- [ ] Can edit existing employee
- [ ] Can delete employee
- [ ] Can filter by department
- [ ] Can sign out

---

## 🎉 Success!

If you've reached this point and the app is running, **Congratulations!** 

You now have a working React application with:
- Advanced Context API patterns
- Global state management
- Multiple contexts
- Performance optimizations
- Real CRUD operations
- Theme management

**Happy Learning!** 🚀

---

**Questions?** Check:
1. Troubleshooting section above
2. `README.md` file
3. Code comments in `src/App.jsx`
4. `CONTEXT_API_GUIDE.md` for architecture details
