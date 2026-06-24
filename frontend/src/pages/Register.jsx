import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiAlertCircle } from 'react-icons/fi';
import axios from 'axios';
import { loginStart, loginSuccess, loginFail, clearError } from '../redux/authSlice';
import toast from 'react-hot-toast';
import '../styles/auth.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      dispatch(loginFail('Passwords do not match'));
      return;
    }
    if (form.password.length < 6) {
      dispatch(loginFail('Password must be at least 6 characters'));
      return;
    }
    dispatch(loginStart());
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/auth/register`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      dispatch(clearError());
      toast.success(data.message || 'Registration successful! An OTP has been sent to your email.', {
        style: { background: 'var(--bg-card)', color: 'var(--text-main)', border: '1px solid var(--bg-border)' },
      });
      navigate('/verify-otp', { state: { email: form.email } });
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      dispatch(loginFail(msg));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow glow-1" />
      <div className="auth-bg-glow glow-2" />

      <div className="auth-card">
        <div className="auth-logo">
          <span>Cart<span style={{ color: 'var(--primary)' }}>worx</span></span>
        </div>

        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">Join thousands of happy shoppers today</p>

        {error && (
          <div className="auth-error">
            <FiAlertCircle /> {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <input
              id="name"
              type="text"
              name="name"
              className="auth-input"
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <FiUser className="auth-input-icon" />
          </div>

          <div className="auth-input-group">
            <input
              id="reg-email"
              type="email"
              name="email"
              className="auth-input"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
            <FiMail className="auth-input-icon" />
          </div>

          <div className="auth-input-group">
            <input
              id="reg-password"
              type={showPass ? 'text' : 'password'}
              name="password"
              className="auth-input"
              placeholder="Create a password (min 6 chars)"
              value={form.password}
              onChange={handleChange}
              required
            />
            <FiLock className="auth-input-icon" />
            <button type="button" className="auth-input-right" onClick={() => setShowPass(!showPass)}>
              {showPass ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="auth-input-group">
            <input
              id="confirm"
              type={showPass ? 'text' : 'password'}
              name="confirm"
              className="auth-input"
              placeholder="Confirm your password"
              value={form.confirm}
              onChange={handleChange}
              required
            />
            <FiLock className="auth-input-icon" />
          </div>

          {/* Password strength hint */}
          {form.password && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                {[1,2,3,4].map(i => (
                  <div key={i} style={{
                    flex: 1, height: 3, borderRadius: 2,
                    background: form.password.length >= i * 3
                      ? i <= 1 ? '#e53e3e' : i <= 2 ? '#ed8936' : i <= 3 ? '#ecc94b' : '#48bb78'
                      : 'var(--bg-border)',
                    transition: 'background 0.3s'
                  }} />
                ))}
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                {form.password.length < 3 ? 'Too short' : form.password.length < 6 ? 'Weak' : form.password.length < 9 ? 'Good' : 'Strong'}
              </p>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
