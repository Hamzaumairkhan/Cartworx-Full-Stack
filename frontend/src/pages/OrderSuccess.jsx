import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiPackage, FiHome, FiShoppingBag } from 'react-icons/fi';

const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    if (!order) navigate('/');
  }, [order, navigate]);

  if (!order) return null;

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-black)' }}>
      <div style={{ textAlign: 'center', padding: '3rem 2rem', maxWidth: 560, width: '100%' }}>
        {/* Success icon */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '2rem' }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'rgba(72,187,120,0.15)', border: '2px solid rgba(72,187,120,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '3rem', margin: '0 auto',
            animation: 'pulse-red 2s infinite',
          }}>
            <FiCheckCircle style={{ color: '#48bb78', fontSize: '3rem' }} />
          </div>
          {/* Ring animation */}
          <div style={{
            position: 'absolute', inset: -8, borderRadius: '50%',
            border: '2px solid rgba(72,187,120,0.2)',
            animation: 'pulse-red 2s infinite',
          }} />
        </div>

        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '0.75rem' }}>
          Order <span style={{ color: '#48bb78' }}>Placed!</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          Thank you for your order! We&apos;ve sent a confirmation email. Your items will be on their way soon.
        </p>

        {/* Order details card */}
        <div style={{
          background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
          borderRadius: 'var(--radius)', padding: '1.75rem', marginBottom: '2rem',
          textAlign: 'left',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--bg-border)' }}>
            <FiPackage style={{ color: 'var(--primary)' }} />
            <span style={{ fontWeight: 700 }}>Order Details</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { label: 'Order ID', value: `#${order._id?.slice(-8).toUpperCase()}` },
              { label: 'Total Amount', value: `$${Number(order.totalAmount).toFixed(2)}` },
              { label: 'Payment Method', value: order.paymentMethod },
              { label: 'Status', value: order.status?.toUpperCase(), highlight: true },
            ].map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: row.highlight ? '#f6ad55' : 'var(--text-white)' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {order.address && (
            <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--bg-border)' }}>
              <p style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Shipping to</p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {order.address.fullName}<br />
                {order.address.street}, {order.address.city}<br />
                {order.address.postalCode}, {order.address.country}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/dashboard" className="btn-primary">
            <FiPackage /> Track Orders
          </Link>
          <Link to="/" className="btn-outline">
            <FiHome /> Back to Home
          </Link>
          <Link to="/shop" className="btn-ghost">
            <FiShoppingBag /> Keep Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
