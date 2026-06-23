import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPackage, FiClock, FiCheckCircle, FiTruck, FiShoppingBag } from 'react-icons/fi';
import { fetchMyOrders } from '../redux/userSlice';

const statusIcon = { pending: <FiClock />, shipped: <FiTruck />, delivered: <FiCheckCircle /> };
const statusColor = { pending: '#f6ad55', shipped: '#63b3ed', delivered: '#68d391' };

const Dashboard = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.user);
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(fetchMyOrders(token));
  }, [dispatch, token]);

  const totalSpent = orders.reduce((s, o) => s + o.totalAmount, 0);
  const delivered = orders.filter((o) => o.status === 'delivered').length;

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>
            My Dashboard
          </h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Welcome back, <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>{user?.name}</span>
          </p>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ marginBottom: '2.5rem' }}>
          {[
            { icon: <FiPackage />, label: 'Total Orders', value: orders.length, color: 'var(--primary)' },
            { icon: <FiCheckCircle />, label: 'Delivered', value: delivered, color: '#68d391' },
            { icon: <FiShoppingBag />, label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, color: '#f6ad55' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
              borderRadius: 'var(--radius)', padding: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.4rem' }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: 800, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--bg-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 700 }}>My Orders</h3>
            <Link to="/shop" className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
              <FiShoppingBag /> Shop More
            </Link>
          </div>

          {loading ? (
            <div className="loading-container"><div className="spinner" /></div>
          ) : orders.length === 0 ? (
            <div className="empty-state">
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
              <h3>No orders yet</h3>
              <p>Your order history will appear here</p>
              <Link to="/shop" className="btn-primary" style={{ marginTop: '1rem' }}>Start Shopping</Link>
            </div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        #{order._id.slice(-8).toUpperCase()}
                      </td>
                      <td>{order.items?.length || 0} item(s)</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>${Number(order.totalAmount).toFixed(2)}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{order.paymentMethod}</td>
                      <td>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                          padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.78rem', fontWeight: 600,
                          background: `${statusColor[order.status] || '#a0aec0'}18`,
                          color: statusColor[order.status] || '#a0aec0',
                          border: `1px solid ${statusColor[order.status] || '#a0aec0'}33`,
                        }}>
                          {statusIcon[order.status]} {order.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
