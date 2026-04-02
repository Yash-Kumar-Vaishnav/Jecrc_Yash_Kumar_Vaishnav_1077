import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Public pages
import Home from './pages/Home';
import { About, Contact } from './pages/StaticPages';

// Auth pages
import Login from './pages/Login';
import Register from './pages/Register';

// Dashboard pages
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';

// Product pages
import ProductList from './pages/products/ProductList';
import ProductDetail from './pages/products/ProductDetail';
import { Reviews, Specs } from './pages/products/ReviewsSpecs';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ── 1. Public Website (MainLayout) ── */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<ProductList />} />
            {/* Product detail with nested routes lives inside MainLayout */}
            <Route path="/products/:productId" element={<ProductDetail />}>
              <Route index element={<Navigate to="reviews" replace />} />
              <Route path="reviews" element={<Reviews />} />
              <Route path="specs" element={<Specs />} />
            </Route>
          </Route>

          {/* ── 2. Auth Module (AuthLayout) ── */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* ── 3. Dashboard Module (Protected + DashboardLayout) ── */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/analytics" element={<Analytics />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>

          {/* ── Fallback ── */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
