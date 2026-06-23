import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin, FiShoppingCart } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer style={{
      background: 'var(--bg-dark)',
      borderTop: '1px solid var(--bg-border)',
      paddingTop: '4rem',
      marginTop: 'auto',
    }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem', paddingBottom: '3rem' }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Link to="/" className="navbar-logo">
                <span className="logo-text">Cart<span>worx</span></span>
              </Link>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              Your premium destination for quality products. Shop with confidence, delivered to your doorstep.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { icon: <FiGithub />, href: '#' },
                { icon: <FiTwitter />, href: '#' },
                { icon: <FiInstagram />, href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--text-muted)', fontSize: '1rem', transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.background = 'rgba(229,62,62,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'Shop', to: '/shop' },
                { label: 'About Us', to: '/about' },
                { label: 'My Cart', to: '/cart' },
                { label: 'My Orders', to: '/dashboard' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>▶</span> {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Categories</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Electronics', 'Clothing', 'Accessories', 'Home & Garden', 'Sports'].map((cat) => (
                <li key={cat}>
                  <Link to={`/shop?category=${cat}`} style={{ color: 'var(--text-muted)', fontSize: '0.875rem', transition: 'var(--transition)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary-light)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    <span style={{ color: 'var(--primary)', fontSize: '0.6rem' }}>▶</span> {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { icon: <FiMapPin />, text: '123 Commerce St, City, 10001' },
                { icon: <FiPhone />, text: '+1 (555) 123-4567' },
                { icon: <FiMail />, text: 'hello@cartworx.com' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  <span style={{ color: 'var(--primary)', marginTop: '2px', flexShrink: 0 }}>{c.icon}</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '1.5rem', paddingBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            © {year} <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Cartworx</span>. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(t => (
              <a key={t} href="#" style={{ color: 'var(--text-dim)', fontSize: '0.8rem', transition: 'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-muted)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-dim)'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
