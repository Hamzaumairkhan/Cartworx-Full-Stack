import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import store from './store';
import { AuthProvider } from './components/authContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetails from './pages/ProductDetails';
import OrderSuccess from './pages/OrderSuccess';
import VerifyOtp from './pages/VerifyOtp';

// Admin Pages
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminUsers from './admin/AdminUsers';
import AddProduct from './admin/AddProduct';
import EditProduct from './admin/EditProduct';

// Styles
import './styles/global.css';

// ScrollToTop + ScrollReveal — route change pe top pe jao aur reveal reset karo
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Har page change pe top pe jao (smooth)
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Scroll reveal elements re-observe karo
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      }),
      { threshold: 0.1 }
    );

    // Thoda delay do taake naya page render ho jaye
    const timer = setTimeout(() => {
      const els = document.querySelectorAll('.reveal');
      els.forEach(el => {
        el.classList.remove('visible'); // reset for new page
        observer.observe(el);
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location]);

  return null;
};

// Guard components
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const UserPrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  return children;
};

const NoAdminRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (user?.role === 'admin') return <Navigate to="/admin" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return isAuthenticated && user?.role === 'admin' ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<NoAdminRoute><Shop /></NoAdminRoute>} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<NoAdminRoute><Cart /></NoAdminRoute>} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-otp" element={<VerifyOtp />} />

                {/* User Private Routes */}
                <Route path="/checkout" element={
                  <UserPrivateRoute>
                    <Checkout />
                  </UserPrivateRoute>
                } />
                <Route path="/dashboard" element={
                  <UserPrivateRoute>
                    <Dashboard />
                  </UserPrivateRoute>
                } />
                <Route path="/profile" element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } />
                <Route path="/order-success" element={
                  <UserPrivateRoute>
                    <OrderSuccess />
                  </UserPrivateRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin" element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                } />
                <Route path="/admin/products" element={
                  <AdminRoute>
                    <AdminProducts />
                  </AdminRoute>
                } />
                <Route path="/admin/products/add" element={
                  <AdminRoute>
                    <AddProduct />
                  </AdminRoute>
                } />
                <Route path="/admin/products/edit/:id" element={
                  <AdminRoute>
                    <EditProduct />
                  </AdminRoute>
                } />
                <Route path="/admin/orders" element={
                  <AdminRoute>
                    <AdminOrders />
                  </AdminRoute>
                } />
                <Route path="/admin/users" element={
                  <AdminRoute>
                    <AdminUsers />
                  </AdminRoute>
                } />

                {/* Catch All Redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
          <Toaster 
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-white)',
                border: '1px solid var(--bg-border)',
                borderRadius: 'var(--radius-sm)',
              },
            }}
          />
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
