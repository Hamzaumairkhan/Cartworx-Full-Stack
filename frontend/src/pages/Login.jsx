import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { loginStart, loginSuccess, loginFail, clearError } from '../redux/authSlice';
import toast from 'react-hot-toast';
import '../styles/auth.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/auth/login`, form);
      dispatch(loginSuccess(data));
      toast.success(`Welcome back, ${data.name}!`, {
        style: { background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--bg-border)' },
      });
      navigate(data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      if (err.response?.data?.isVerified === false) {
        dispatch(clearError());
        toast.error(err.response.data.message || 'Please verify your account.', {
          style: { background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--bg-border)' },
        });
        navigate('/verify-otp', { state: { email: form.email } });
      } else {
        const msg = err.response?.data?.message || 'Login failed. Please try again.';
        dispatch(loginFail(msg));
      }
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow glow-1" />
      <div className="auth-bg-glow glow-2" />

      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <span>Cart<span style={{ color: 'var(--primary)' }}>worx</span></span>
        </div>

        <h1 className="auth-title">Welcome Back</h1>
        <p className="auth-subtitle">Sign in to your account to continue shopping</p>

        {error && (
          <div className="auth-error">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="auth-input-group">
            <input
              id="email"
              type="email"
              name="email"
              className="auth-input"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            <FiMail className="auth-input-icon" />
          </div>

          {/* Password */}
          <div className="auth-input-group">
            <input
              id="password"
              type={showPass ? 'text' : 'password'}
              name="password"
              className="auth-input"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <FiLock className="auth-input-icon" />
            <button type="button" className="auth-input-right" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          Don&apos;t have an account?{' '}
          <Link to="/register">Create one free</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
