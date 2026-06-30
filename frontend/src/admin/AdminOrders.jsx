import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiRefreshCw, FiChevronDown, FiCheck } from 'react-icons/fi';
import { fetchAllOrders, updateOrderStatus } from '../redux/userSlice';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['pending', 'shipped', 'delivered'];
const statusColor = { pending: '#f6ad55', shipped: '#63b3ed', delivered: '#68d391' };
const statusBg = { pending: 'rgba(246,173,85,0.12)', shipped: 'rgba(99,179,237,0.12)', delivered: 'rgba(104,211,145,0.12)' };
const statusBorder = { pending: 'rgba(246,173,85,0.3)', shipped: 'rgba(99,179,237,0.3)', delivered: 'rgba(104,211,145,0.3)' };
const statusEmoji = { pending: '⏳', shipped: '🚚', delivered: '✅' };

// Custom Dropdown Component
const StatusDropdown = ({ orderId, currentStatus, onStatusChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', zIndex: open ? 10 : 1 }}>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.35rem 0.7rem',
          borderRadius: 8,
          fontSize: '0.78rem', fontWeight: 700,
          background: statusBg[currentStatus],
          border: `1.5px solid ${statusBorder[currentStatus]}`,
          color: statusColor[currentStatus],
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
        }}
      >
        <span>{statusEmoji[currentStatus]}</span>
        <span>{currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}</span>
        <FiChevronDown style={{ fontSize: '0.75rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: '#1e1e1e',
          border: '1px solid #2e2e2e',
          borderRadius: 12,
          padding: '0.4rem',
          minWidth: 155,
          boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
          zIndex: 100,
          animation: 'fadeInUp 0.15s ease',
        }}>
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => { onStatusChange(orderId, s); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                width: '100%', padding: '0.5rem 0.75rem',
                borderRadius: 8, border: 'none',
                background: s === currentStatus ? statusBg[s] : 'transparent',
                color: s === currentStatus ? statusColor[s] : '#a0aec0',
                fontSize: '0.82rem', fontWeight: s === currentStatus ? 700 : 500,
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (s !== currentStatus) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={e => { if (s !== currentStatus) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a0aec0'; } }}
            >
              <span style={{ fontSize: '0.9rem' }}>{statusEmoji[s]}</span>
              <span style={{ flex: 1 }}>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
              {s === currentStatus && <FiCheck style={{ fontSize: '0.8rem', color: statusColor[s] }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};


const AdminOrders = () => {
  const dispatch = useDispatch();
  const { allOrders, loading } = useSelector((s) => s.user);
  const { token } = useSelector((s) => s.auth);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (token) dispatch(fetchAllOrders(token));
  }, [dispatch, token]);

  const filtered = filter === 'all' ? allOrders : allOrders.filter((o) => o.status === filter);

  const handleStatusChange = async (id, status) => {
    const result = await dispatch(updateOrderStatus({ id, status, token }));
    if (updateOrderStatus.fulfilled.match(result)) {
      toast.success(`Order status updated to "${status}"`);
    } else {
      toast.error('Failed to update status');
    }
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>Orders</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{allOrders.length} total orders</p>
          </div>
          <button onClick={() => dispatch(fetchAllOrders(token))} className="btn-outline" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
            <FiRefreshCw /> Refresh
          </button>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {['all', ...STATUS_OPTIONS].map((s) => {
            const count = s === 'all' ? allOrders.length : allOrders.filter(o => o.status === s).length;
            return (
              <button key={s} onClick={() => setFilter(s)} style={{
                padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer', transition: 'var(--transition)',
                background: filter === s ? (s === 'all' ? 'var(--gradient-red)' : `${statusColor[s]}22`) : 'var(--bg-card)',
                border: `1px solid ${filter === s ? (s === 'all' ? 'var(--primary)' : statusColor[s]) : 'var(--bg-border)'}`,
                color: filter === s ? (s === 'all' ? 'white' : statusColor[s]) : 'var(--text-muted)',
              }}>
                {s.charAt(0).toUpperCase() + s.slice(1)} ({count})
              </button>
            );
          })}
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3>No orders found</h3>
          </div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)' }}>
            <div className="table-wrapper" style={{ overflow: 'visible' }}>
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{order._id.slice(-8).toUpperCase()}</td>
                      <td style={{ fontSize: '0.875rem', fontWeight: 500 }}>{order.user?.name || 'N/A'}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{order.items?.length || 0} item(s)</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>${Number(order.totalAmount).toFixed(2)}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{order.paymentMethod}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td>
                        <StatusDropdown
                          orderId={order._id}
                          currentStatus={order.status}
                          onStatusChange={handleStatusChange}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
