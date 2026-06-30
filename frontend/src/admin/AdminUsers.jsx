import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUsers, FiShield, FiUser, FiChevronDown, FiCheck } from 'react-icons/fi';
import { fetchAllUsers, updateUserRole } from '../redux/userSlice';
import toast from 'react-hot-toast';

const ROLE_OPTIONS = ['user', 'admin'];

const RoleDropdown = ({ userId, currentRole, onRoleChange, currentUserEmail, targetUserEmail }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  const isSelf = currentUserEmail === targetUserEmail;

  return (
    <div ref={ref} style={{ position: 'relative', display: 'inline-block', zIndex: open ? 10 : 1 }}>
      <button
        onClick={() => {
          if (isSelf) return toast.error("You cannot change your own role!");
          setOpen(!open);
        }}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.4rem',
          padding: '0.35rem 0.7rem',
          borderRadius: 8,
          fontSize: '0.78rem', fontWeight: 700,
          background: currentRole === 'admin' ? 'rgba(229,62,62,0.15)' : 'rgba(72,187,120,0.12)',
          border: `1.5px solid ${currentRole === 'admin' ? 'rgba(229,62,62,0.3)' : 'rgba(72,187,120,0.3)'}`,
          color: currentRole === 'admin' ? 'var(--primary-light)' : '#68d391',
          cursor: isSelf ? 'not-allowed' : 'pointer',
          opacity: isSelf ? 0.6 : 1,
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
        }}
        title={isSelf ? "Cannot change own role" : "Change Role"}
      >
        <span>{currentRole === 'admin' ? <FiShield /> : <FiUser />}</span>
        <span>{currentRole}</span>
        {!isSelf && <FiChevronDown style={{ fontSize: '0.75rem', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', right: 0,
          background: '#1e1e1e',
          border: '1px solid #2e2e2e',
          borderRadius: 12,
          padding: '0.4rem',
          minWidth: 130,
          boxShadow: '0 16px 48px rgba(0,0,0,0.7)',
          zIndex: 100,
          animation: 'fadeInUp 0.15s ease',
        }}>
          {ROLE_OPTIONS.map((r) => (
            <button
              key={r}
              onClick={() => { onRoleChange(userId, r); setOpen(false); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                width: '100%', padding: '0.5rem 0.75rem',
                borderRadius: 8, border: 'none',
                background: r === currentRole ? (r === 'admin' ? 'rgba(229,62,62,0.15)' : 'rgba(72,187,120,0.12)') : 'transparent',
                color: r === currentRole ? (r === 'admin' ? 'var(--primary-light)' : '#68d391') : '#a0aec0',
                fontSize: '0.82rem', fontWeight: r === currentRole ? 700 : 500,
                cursor: 'pointer', textAlign: 'left',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={e => { if (r !== currentRole) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; } }}
              onMouseLeave={e => { if (r !== currentRole) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#a0aec0'; } }}
            >
              <span style={{ fontSize: '0.9rem' }}>{r === 'admin' ? <FiShield /> : <FiUser />}</span>
              <span style={{ flex: 1 }}>{r}</span>
              {r === currentRole && <FiCheck style={{ fontSize: '0.8rem', color: r === 'admin' ? 'var(--primary-light)' : '#68d391' }} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminUsers = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((s) => s.user);
  const { token, user: currentUser } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) dispatch(fetchAllUsers(token));
  }, [dispatch, token]);

  const handleRoleChange = async (id, role) => {
    const result = await dispatch(updateUserRole({ id, role, token }));
    if (updateUserRole.fulfilled.match(result)) {
      toast.success(`User role updated to "${role}"`);
    } else {
      toast.error('Failed to update user role');
    }
  };

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
          <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)' }}>
            <div className="table-wrapper" style={{ overflow: 'visible' }}>
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
                        <RoleDropdown 
                          userId={user._id} 
                          currentRole={user.role} 
                          onRoleChange={handleRoleChange} 
                          currentUserEmail={currentUser?.email}
                          targetUserEmail={user.email}
                        />
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
