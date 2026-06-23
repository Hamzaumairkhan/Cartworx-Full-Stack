import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiUser, FiLogOut, FiSettings, FiPackage, FiChevronDown, FiHome, FiGrid, FiInfo, FiMenu, FiX, FiShield, FiSun, FiMoon } from 'react-icons/fi';
import { logout } from '../redux/authSlice';
import { selectCartCount } from '../redux/cartSlice';
import '../styles/navbar.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartCount = useSelector(selectCartCount);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [theme, setTheme] = useState(localStorage.getItem('cartworx_theme') || 'dark');

  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
    localStorage.setItem('cartworx_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    setMobileOpen(false);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const getInitials = (name) => name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <span className="logo-text">Cart<span>worx</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar-links">
          <li><NavLink to="/" end><FiHome /> Home</NavLink></li>
          <li><NavLink to="/shop"><FiGrid /> Shop</NavLink></li>
          <li><NavLink to="/about"><FiInfo /> About</NavLink></li>
          {isAuthenticated && <li><NavLink to="/dashboard"><FiPackage /> Dashboard</NavLink></li>}
          {user?.role === 'admin' && <li><NavLink to="/admin"><FiShield /> Admin</NavLink></li>}
        </ul>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Theme Toggle */}
          <button className="nav-icon-btn" onClick={toggleTheme} title="Toggle Theme" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>

          {/* Cart */}
          <Link to="/cart" className="nav-icon-btn" title="Cart">
            <FiShoppingCart />
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>}
          </Link>

          {/* User Menu */}
          {isAuthenticated ? (
            <div className="nav-user-menu" ref={dropdownRef}>
              <button className="nav-user-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <div className="nav-avatar">{getInitials(user?.name)}</div>
                <span>{user?.name?.split(' ')[0]}</span>
                <FiChevronDown style={{ transition: 'transform 0.3s', transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {dropdownOpen && (
                <div className="nav-dropdown">
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}><FiUser /> Profile</Link>
                  <Link to="/dashboard" onClick={() => setDropdownOpen(false)}><FiPackage /> My Orders</Link>
                  {user?.role === 'admin' && (
                    <Link to="/admin" onClick={() => setDropdownOpen(false)}><FiShield /> Admin Panel</Link>
                  )}
                  <div className="dropdown-divider" />
                  <button className="logout-btn" onClick={handleLogout}><FiLogOut /> Logout</button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.875rem' }}>
              <FiUser /> Login
            </Link>
          )}

          {/* Mobile Toggle */}
          <button
            className={`navbar-toggle ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav >

      {/* Mobile Menu */ }
      < div className = {`mobile-menu ${mobileOpen ? 'open' : ''}`
}>
  <ul>
    <li><NavLink to="/" end onClick={() => setMobileOpen(false)}><FiHome /> Home</NavLink></li>
    <li><NavLink to="/shop" onClick={() => setMobileOpen(false)}><FiGrid /> Shop</NavLink></li>
    <li><NavLink to="/about" onClick={() => setMobileOpen(false)}><FiInfo /> About</NavLink></li>
    <li><NavLink to="/cart" onClick={() => setMobileOpen(false)}><FiShoppingCart /> Cart {cartCount > 0 && `(${cartCount})`}</NavLink></li>
    {isAuthenticated ? (
      <>
        <li><NavLink to="/dashboard" onClick={() => setMobileOpen(false)}><FiPackage /> Dashboard</NavLink></li>
        <li><NavLink to="/profile" onClick={() => setMobileOpen(false)}><FiUser /> Profile</NavLink></li>
        {user?.role === 'admin' && <li><NavLink to="/admin" onClick={() => setMobileOpen(false)}><FiShield /> Admin</NavLink></li>}
        <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.75rem 1rem', color: 'var(--error)', width: '100%', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', fontWeight: '500' }}><FiLogOut /> Logout</button></li>
      </>
    ) : (
      <li><NavLink to="/login" onClick={() => setMobileOpen(false)}><FiUser /> Login / Register</NavLink></li>
    )}
  </ul>
      </div >
    </>
  );
};

export default Navbar;
