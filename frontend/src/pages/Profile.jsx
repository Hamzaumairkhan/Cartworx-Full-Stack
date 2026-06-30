import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiUser, FiMail, FiShield, FiPackage, FiEdit2, FiX, FiSave } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { updateSuccess } from '../redux/authSlice';

const API = import.meta.env.VITE_API_URL || '/api';

const Profile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const getInitials = (name) =>
    name?.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.put(`${API}/auth/profile`, formData, config);
      dispatch(updateSuccess(data));
      toast.success('Profile updated successfully');
      setIsEditing(false);
      setFormData({ ...formData, password: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div style={{ paddingTop: '90px', minHeight: '100vh', position: 'relative' }}>
      <div className="container" style={{ padding: '2rem 1.5rem 4rem', maxWidth: 800 }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '2rem' }}>My Profile</h1>

        {/* Avatar Card */}
        <div style={{
          background: 'linear-gradient(135deg, #1a0505 0%, #2d0a0a 100%)',
          border: '1px solid rgba(229,62,62,0.25)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: 200, height: 200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,62,62,0.15) 0%, transparent 70%)' }} />

          {/* Big Avatar */}
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'var(--gradient-red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.2rem', fontWeight: 800, color: 'white',
            boxShadow: 'var(--shadow-red)', flexShrink: 0,
          }}>
            {getInitials(user?.name)}
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.25rem' }}>{user?.name}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '0.875rem' }}>{user?.email}</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                padding: '0.3rem 0.875rem', borderRadius: '100px',
                background: user?.role === 'admin' ? 'rgba(229,62,62,0.15)' : 'rgba(72,187,120,0.15)',
                border: `1px solid ${user?.role === 'admin' ? 'rgba(229,62,62,0.35)' : 'rgba(72,187,120,0.35)'}`,
                color: user?.role === 'admin' ? 'var(--primary-light)' : '#68d391',
                fontSize: '0.8rem', fontWeight: 600,
              }}>
                <FiShield /> {user?.role === 'admin' ? 'Administrator' : 'Customer'}
              </span>
            </div>
          </div>

          <button style={{
            position: 'absolute', top: '1.25rem', right: '1.25rem',
            background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--radius-sm)', padding: '0.5rem 0.875rem',
            color: 'var(--text-muted)', fontSize: '0.8rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '0.4rem',
            transition: 'var(--transition)',
          }}
            onClick={() => setIsEditing(true)}
            onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
          >
            <FiEdit2 /> Edit
          </button>
        </div>

        {/* Info Grid */}
        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          {[
            { icon: <FiUser />, label: 'Full Name', value: user?.name },
            { icon: <FiMail />, label: 'Email Address', value: user?.email },
            { icon: <FiShield />, label: 'Account Role', value: user?.role === 'admin' ? 'Administrator' : 'Customer' },
            { icon: <FiPackage />, label: 'Total Orders', value: orders.length },
          ].map((info) => (
            <div key={info.label} style={{
              background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
              borderRadius: 'var(--radius)', padding: '1.25rem',
              display: 'flex', alignItems: 'center', gap: '1rem',
            }}>
              <div style={{
                width: 42, height: 42, borderRadius: 10,
                background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--primary)', fontSize: '1.1rem', flexShrink: 0,
              }}>
                {info.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: '0.25rem' }}>{info.label}</div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{info.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div style={{ background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>Quick Actions</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link to="/dashboard" className="btn-primary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
              <FiPackage /> View Orders
            </Link>
            <Link to="/shop" className="btn-outline" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem' }}>
              Browse Shop
            </Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className="btn-outline" style={{ padding: '0.65rem 1.25rem', fontSize: '0.875rem', borderColor: 'var(--primary)', color: 'var(--primary-light)' }}>
                <FiShield /> Admin Panel
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditing && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          background: 'rgba(0,0,0,0.8)', zIndex: 1000, display: 'flex',
          alignItems: 'center', justifyContent: 'center', padding: '1rem',
          backdropFilter: 'blur(5px)',
        }}>
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
            borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: 450,
            padding: '2rem', position: 'relative',
          }}>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                background: 'none', border: 'none', color: 'var(--text-muted)',
                cursor: 'pointer', fontSize: '1.2rem',
              }}
            >
              <FiX />
            </button>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1.5rem' }}>Edit Profile</h3>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%', padding: '0.75rem', background: 'var(--bg-body)',
                    border: '1px solid var(--bg-border)', borderRadius: 'var(--radius-sm)',
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%', padding: '0.75rem', background: 'var(--bg-body)',
                    border: '1px solid var(--bg-border)', borderRadius: 'var(--radius-sm)',
                    color: 'white',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.4rem', color: 'var(--text-muted)' }}>New Password (optional)</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                  style={{
                    width: '100%', padding: '0.75rem', background: 'var(--bg-body)',
                    border: '1px solid var(--bg-border)', borderRadius: 'var(--radius-sm)',
                    color: 'white',
                  }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem' }}
              >
                {loading ? <div className="spinner" style={{ width: 20, height: 20, borderWidth: 2 }}></div> : <><FiSave /> Save Changes</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
