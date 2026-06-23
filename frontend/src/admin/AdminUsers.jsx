import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUsers, FiShield, FiUser } from 'react-icons/fi';
import { fetchAllUsers } from '../redux/userSlice';

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((s) => s.user);
  const { token } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) dispatch(fetchAllUsers(token));
  }, [dispatch, token]);

  const admins = users.filter((u) => u.role === 'admin').length;
  const customers = users.filter((u) => u.role !== 'admin').length;

  const getInitials = (name) =>
    name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.3rem' }}>Users</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{users.length} registered users</p>
        </div>

        {/* Stats */}
        <div className="grid-3" style={{ marginBottom: '2rem' }}>
          {[
            { icon: <FiUsers />, label: 'Total Users', value: users.length, color: '#63b3ed' },
            { icon: <FiShield />, label: 'Admins', value: admins, color: 'var(--primary)' },
            { icon: <FiUser />, label: 'Customers', value: customers, color: '#68d391' },
          ].map((s) => (
            <div key={s.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
              borderRadius: 'var(--radius)', padding: '1.5rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: `${s.color}18`, border: `1px solid ${s.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color, fontSize: '1.25rem' }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="loading-container"><div className="spinner" /></div>
        ) : (
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', overflow: 'hidden' }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>ID</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{
                            width: 38, height: 38, borderRadius: '50%',
                            background: user.role === 'admin' ? 'var(--gradient-red)' : 'linear-gradient(135deg,#2d3748,#4a5568)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '0.8rem', fontWeight: 700, color: 'white', flexShrink: 0,
                          }}>
                            {getInitials(user.name)}
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user.name}</span>
                        </div>
                      </td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{user.email}</td>
                      <td>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                          padding: '0.25rem 0.7rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 600,
                          background: user.role === 'admin' ? 'rgba(229,62,62,0.15)' : 'rgba(72,187,120,0.12)',
                          color: user.role === 'admin' ? 'var(--primary-light)' : '#68d391',
                          border: `1px solid ${user.role === 'admin' ? 'rgba(229,62,62,0.3)' : 'rgba(72,187,120,0.3)'}`,
                        }}>
                          {user.role === 'admin' ? <FiShield /> : <FiUser />}
                          {user.role}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-dim)' }}>{user._id.slice(-12)}</td>
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

export default AdminUsers;
