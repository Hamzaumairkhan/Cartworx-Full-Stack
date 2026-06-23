import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPackage, FiUsers, FiShoppingBag, FiTrendingUp, FiDollarSign, FiActivity, FiArrowRight } from 'react-icons/fi';
import { fetchAllOrders } from '../redux/userSlice';
import { fetchAllUsers } from '../redux/userSlice';
import { fetchProducts } from '../redux/productSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((s) => s.auth);
  const { allOrders, users } = useSelector((s) => s.user);
  const { products } = useSelector((s) => s.products);

  useEffect(() => {
    if (token) {
      dispatch(fetchAllOrders(token));
      dispatch(fetchAllUsers(token));
      dispatch(fetchProducts());
    }
  }, [dispatch, token]);

  const totalRevenue = allOrders.reduce((s, o) => s + o.totalAmount, 0);
  const pendingOrders = allOrders.filter((o) => o.status === 'pending').length;
  const deliveredOrders = allOrders.filter((o) => o.status === 'delivered').length;

  const stats = [
    { icon: <FiDollarSign />, label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, color: '#48bb78', sub: 'All time' },
    { icon: <FiShoppingBag />, label: 'Total Orders', value: allOrders.length, color: '#63b3ed', sub: `${pendingOrders} pending` },
    { icon: <FiPackage />, label: 'Products', value: products.length, color: 'var(--primary)', sub: 'In catalogue' },
    { icon: <FiUsers />, label: 'Customers', value: users.length, color: '#f6ad55', sub: 'Registered users' },
  ];

  const recentOrders = allOrders.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  const statusColor = { pending: '#f6ad55', shipped: '#63b3ed', delivered: '#68d391' };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>Admin Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Overview of your store performance</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/products/add" className="btn-primary" style={{ fontSize: '0.875rem', padding: '0.6rem 1.25rem' }}>
              + Add Product
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid-4" style={{ marginBottom: '2rem' }}>
          {stats.map((s) => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
              borderRadius: 'var(--radius)', padding: '1.5rem',
              transition: 'var(--transition)', position: 'relative', overflow: 'hidden',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = `${s.color}44`}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
            >
              <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, borderRadius: '0 0 0 80px', background: `${s.color}10` }} />
              <div style={{ width: 44, height: 44, borderRadius: 10, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.25rem', marginBottom: '1rem' }}>
                {s.icon}
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1, marginBottom: '0.3rem' }}>{s.value}</div>
              <div style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.2rem' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Quick Nav */}
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {[
            { to: '/admin/products', icon: <FiPackage />, label: 'Manage Products', desc: `${products.length} products`, color: 'var(--primary)' },
            { to: '/admin/orders', icon: <FiShoppingBag />, label: 'Manage Orders', desc: `${pendingOrders} pending`, color: '#63b3ed' },
            { to: '/admin/users', icon: <FiUsers />, label: 'Manage Users', desc: `${users.length} registered`, color: '#f6ad55' },
          ].map((item) => (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: '1rem',
              background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
              borderRadius: 'var(--radius)', padding: '1.25rem',
              textDecoration: 'none', transition: 'var(--transition)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = `${item.color}44`; e.currentTarget.style.transform = 'translateY(-3px)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.transform = 'none'; }}
            >
              <div style={{ width: 46, height: 46, borderRadius: 10, background: `${item.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color, fontSize: '1.25rem', flexShrink: 0 }}>
                {item.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-white)', fontSize: '0.95rem' }}>{item.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>{item.desc}</div>
              </div>
              <FiArrowRight style={{ color: 'var(--text-dim)' }} />
            </Link>
          ))}
        </div>

        {/* Recent Orders */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--bg-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
              <FiActivity style={{ color: 'var(--primary)' }} /> Recent Orders
            </div>
            <Link to="/admin/orders" style={{ fontSize: '0.8rem', color: 'var(--primary-light)' }}>View all →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No orders yet</div>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>#{order._id.slice(-8).toUpperCase()}</td>
                      <td>{order.user?.name || 'N/A'}</td>
                      <td style={{ fontWeight: 700, color: 'var(--primary-light)' }}>${Number(order.totalAmount).toFixed(2)}</td>
                      <td>
                        <span style={{ padding: '0.25rem 0.65rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600, background: `${statusColor[order.status]}18`, color: statusColor[order.status], border: `1px solid ${statusColor[order.status]}33` }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{new Date(order.createdAt).toLocaleDateString()}</td>
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

export default AdminDashboard;
