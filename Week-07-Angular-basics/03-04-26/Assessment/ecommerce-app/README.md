# ShopElite — Enterprise E-Commerce App

A full React application demonstrating enterprise routing patterns.

## Features

- **MainLayout** — Public pages (Home, About, Contact, Products) with header, sidebar & footer
- **AuthLayout** — Minimal login/register layout (no header/footer)
- **DashboardLayout** — Protected admin dashboard with sidebar navigation
- **ProtectedRoute** — Redirects unauthenticated users to `/login`
- **Dynamic routing** — `/products/:productId` with `useParams()`
- **Nested routing** — `/products/:id/reviews` and `/products/:id/specs` using `<Outlet />`
- **AuthContext** — React Context for auth state across the whole app

## Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000)

## Demo Login

Enter **any email and password** on the Login page — the app uses mock authentication.

## Route Map

| Path                         | Component         | Access    |
|------------------------------|-------------------|-----------|
| `/`                          | Home              | Public    |
| `/about`                     | About             | Public    |
| `/contact`                   | Contact           | Public    |
| `/products`                  | ProductList       | Public    |
| `/products/:productId`       | ProductDetail     | Public    |
| `/products/:productId/reviews` | Reviews (nested) | Public  |
| `/products/:productId/specs`   | Specs (nested)   | Public  |
| `/login`                     | Login             | Guest     |
| `/register`                  | Register          | Guest     |
| `/dashboard`                 | Dashboard         | Protected |
| `/dashboard/analytics`       | Analytics         | Protected |
| `/dashboard/settings`        | Settings          | Protected |
