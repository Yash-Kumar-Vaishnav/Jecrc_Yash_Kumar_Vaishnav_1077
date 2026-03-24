# 🛍️ ShopEasy - Angular E-Commerce App

A fully functional Angular 19 e-commerce application with product listing, cart, and checkout features.

---

## 📁 Project Structure

```
ecommerce-app/
├── src/
│   ├── app/
│   │   ├── shared/
│   │   │   ├── models/
│   │   │   │   └── product.model.ts       # Product, CartItem, Order interfaces
│   │   │   └── services/
│   │   │       ├── product.service.ts     # Product data & filtering
│   │   │       ├── cart.service.ts        # Cart state using Angular Signals
│   │   │       └── order.service.ts       # Order placement & history
│   │   ├── product-list/                  # Product browsing page
│   │   ├── cart/                          # Cart management page
│   │   ├── checkout/                      # Multi-step checkout page
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.css
├── angular.json
├── package.json
└── tsconfig.json
```

---

## 🚀 Setup & Run

### Prerequisites
- Node.js 18+ installed
- Angular CLI installed globally

### Install Angular CLI (if not installed)
```bash
npm install -g @angular/cli
```

### Steps

```bash
# 1. Extract the zip and open folder
cd ecommerce-app

# 2. Install dependencies
npm install

# 3. Run development server
ng serve

# 4. Open browser
# Navigate to http://localhost:4200
```

---

## ✨ Features

### 🏠 Product List Page (`/`)
- Grid display of 8 products with images, ratings, price
- Category filter sidebar (Electronics, Footwear, etc.)
- Live search by name / description
- Sort by Name, Price (Low-High / High-Low), Rating
- "Add to Cart" button with visual feedback
- Low stock warning badge
- Sticky header with cart badge counter

### 🛒 Cart Page (`/cart`)
- View all cart items with images
- Increase / Decrease / Remove items
- Clear entire cart
- Order summary with GST (18%) calculation
- Free shipping
- Proceed to Checkout button

### 💳 Checkout Page (`/checkout`)
- **Step 1 – Shipping Details**: Name, email, phone, address, city, PIN
- **Step 2 – Payment**: Credit/Debit Card, UPI, or Cash on Delivery
- **Step 3 – Confirmation**: Order ID, delivery details, success screen
- Form validation before proceeding
- Loading state during order processing

---

## 🛠️ Technical Highlights

| Feature | Implementation |
|---|---|
| State Management | Angular Signals (CartService) |
| Routing | Angular Router with standalone components |
| Forms | Template-driven with ngModel |
| Services | Injectable services with RxJS Observables |
| Styling | Component-scoped CSS, no external UI library |
| Architecture | Standalone components (Angular 17+) |

---

## 🎨 UI Theme

- Primary gradient: `#667eea → #764ba2` (purple)
- Success: `#43e97b → #38f9d7` (green)
- Font: Segoe UI
- Fully responsive (mobile-friendly)

---

## 📦 Key Services

### CartService
Uses Angular 17+ Signals for reactive state:
```typescript
cartService.items()       // All cart items
cartService.itemCount()   // Total quantity
cartService.totalPrice()  // Total price
cartService.addToCart(product)
cartService.removeFromCart(id)
cartService.updateQuantity(id, qty)
cartService.clearCart()
```

### ProductService
```typescript
productService.getProducts()              // All products
productService.getProductById(id)         // Single product
productService.getCategories()            // All categories
productService.getProductsByCategory(cat) // Filtered products
```

### OrderService
```typescript
orderService.placeOrder(items, total, customerDetails)  // Place order
orderService.getOrders()                                // All orders
orderService.getOrderById(id)                           // Single order
```
