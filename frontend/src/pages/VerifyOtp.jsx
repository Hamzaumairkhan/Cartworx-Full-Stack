import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiLock, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';
import { loginStart, loginSuccess, loginFail } from '../redux/authSlice';
import toast from 'react-hot-toast';
import '../styles/auth.css';

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Read email from state if redirected from Register or Login
  const [email, setEmail] = useState(location.state?.email || '');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(60); // 60 seconds resend cooldown
  const [canResend, setCanResend] = useState(false);
  const [localError, setLocalError] = useState('');

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setLocalError('Please enter your email address');
      return;
    }
    if (!otp || otp.length !== 6) {
      setLocalError('Please enter a valid 6-digit OTP code');
      return;
    }
    setLocalError('');
    dispatch(loginStart());

    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/auth/verify-otp`, { email, otp });
      
      // verify-otp returns full user info + token on success
      dispatch(loginSuccess(data));
      
      toast.success(`Account verified! Welcome to Cartworx, ${data.name}! 🎉`, {
        style: { background: 'var(--bg-card)', color: 'white', border: '1px solid var(--bg-border)' },
      });
      
      navigate(data.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Verification failed. Please check your OTP.';
      dispatch(loginFail(msg));
    }
  };

  const handleResend = async () => {
    if (!email) {
      setLocalError('Please enter your email address to resend OTP');
      return;
    }
    setLocalError('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL || '/api'}/auth/resend-otp`, { email });
      toast.success('A new OTP has been sent to your email.');
      setTimer(60);
      setCanResend(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend OTP. Try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg-glow glow-1" />
      <div className="auth-bg-glow glow-2" />

      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">🛒</div>
          <span>Cart<span style={{ color: 'var(--primary)' }}>worx</span></span>
        </div>

        <h1 className="auth-title">Verify Email</h1>
        <p className="auth-subtitle">Please check your email inbox for the verification OTP code</p>

        {(error || localError) && (
          <div className="auth-error">
            <FiAlertCircle /> {localError || error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Email input (editable if not passed in navigation state) */}
          <div className="auth-input-group">
            <input
              id="email"
              type="email"
              name="email"
              className="auth-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={!!location.state?.email}
              style={location.state?.email ? { opacity: 0.7, cursor: 'not-allowed' } : {}}
            />
            <FiMail className="auth-input-icon" />
          </div>

          {/* OTP Code input */}
          <div className="auth-input-group">
            <input
              id="otp"
              type="text"
              name="otp"
              className="auth-input"
              placeholder="Enter 6-digit OTP code"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
              maxLength={6}
              required
              style={{ letterSpacing: '4px', textAlign: 'center', paddingLeft: '1rem', fontWeight: 'bold', fontSize: '1.2rem' }}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP & Login'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Didn&apos;t receive the code?{' '}
          {canResend ? (
            <button 
              onClick={handleResend} 
              style={{ background: 'none', border: 'none', color: 'var(--primary-light)', fontWeight: 600, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Resend OTP
            </button>
          ) : (
            <span>Resend OTP in <strong>{timer}s</strong></span>
          )}
        </div>

        <div className="auth-footer">
          Already verified?{' '}
          <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
