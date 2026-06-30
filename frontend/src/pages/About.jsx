import { Link } from 'react-router-dom';
import { FiTarget, FiHeart, FiAward, FiUsers, FiShoppingBag, FiArrowRight, FiTruck, FiLock, FiRefreshCw, FiMessageCircle } from 'react-icons/fi';

import { FiShoppingCart } from 'react-icons/fi';
const About = () => {
  const team = [
    { name: 'Alex Carter', role: 'CEO & Founder', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces' },
    { name: 'Sarah Kim', role: 'Head of Design', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces' },
    { name: 'David Chen', role: 'Lead Engineer', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=faces' },
    { name: 'Maya Patel', role: 'Customer Success', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces' },
  ];

  const values = [
    { icon: <FiTarget />, title: 'Quality First', desc: 'Every product is carefully curated to meet our high standards before it reaches you.' },
    { icon: <FiHeart />, title: 'Customer Love', desc: 'Your satisfaction drives everything we do. We go above and beyond for every customer.' },
    { icon: <FiAward />, title: 'Trusted Brand', desc: 'Building trust through transparency, reliability and consistent excellence.' },
    { icon: <FiUsers />, title: 'Community', desc: 'We believe in building a community of happy shoppers who love great products.' },
  ];

  return (
    <div style={{ paddingTop: '70px', minHeight: '100vh' }}>

      {/* Hero */}
      <section style={{
        padding: '5rem 0',
        background: 'linear-gradient(135deg, var(--bg-black) 0%, var(--bg-dark) 50%, var(--bg-black) 100%)',
        borderBottom: '1px solid var(--bg-border)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,62,62,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative' }}>
          <div className="anim-fade-in-down" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 600 }}>
            🛒 Our Story
          </div>
          <h1 className="anim-fade-in-up delay-100" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900, marginBottom: '1.5rem', fontFamily: "'Times New Roman', Times, serif", fontStyle: 'italic', lineHeight: 1.0 }}>
            We&apos;re Redefining <br /><span className="text-gradient">Online Shopping</span>
          </h1>
          <p className="anim-fade-in-up delay-200" style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Cartworx was founded with a simple belief: everyone deserves access to premium products at fair prices, with an experience that actually feels good.
          </p>
          <div className="anim-fade-in-up delay-300" style={{ display: 'flex', gap: '3rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { value: '2026', label: 'Founded' },
              { value: '50K+', label: 'Customers' },
              { value: '10K+', label: 'Products' },
              { value: '4.9★', label: 'Rating' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.08)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}
              >
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-light)' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', gap: '4rem' }}>
            <div className="anim-fade-in-left">
              <h2 className="section-title">Our <span className="text-gradient">Mission</span></h2>
              <div className="divider" />
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.05rem' }}>
                At Cartworx, we&apos;re on a mission to make premium shopping accessible to everyone. We handpick each product and partner with trusted suppliers to bring you quality you can count on.
              </p>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem' }}>
                We combine cutting-edge technology with genuine care for our customers, creating a shopping experience that&apos;s fast, secure, and actually enjoyable.
              </p>
              <Link to="/shop" className="btn-primary">
                <FiShoppingBag /> Explore Products <FiArrowRight />
              </Link>
            </div>

            <div className="anim-fade-in-right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: <FiTruck />, title: 'Fast Delivery', desc: '2-3 business days', color: '#fc8181' },
                { icon: <FiLock />, title: 'Secure', desc: '256-bit SSL encryption', color: '#f6ad55' },
                { icon: <FiRefreshCw />, title: 'Sustainable', desc: 'Eco-friendly packaging', color: '#68d391' },
                { icon: <FiMessageCircle />, title: '24/7 Support', desc: 'Always here to help', color: '#b794f4' },
              ].map((item, i) => (
                <div key={item.title} className={`anim-scale-in delay-${(i + 1) * 100}`} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
                  borderRadius: 'var(--radius)', padding: '1.5rem',
                  transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(229,62,62,0.3)'; e.currentTarget.style.transform = 'translateY(-6px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem', color: item.color }}>{item.icon}</div>
                  <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>{item.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="reveal" style={{ padding: '4rem 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--bg-border)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title anim-fade-in-down">Our <span className="text-gradient">Values</span></h2>
            <div className="divider" style={{ margin: '0.75rem auto 1rem' }} />
          </div>
          <div className="grid-4">
            {values.map((v, i) => (
              <div key={v.title} className={`anim-fade-in-up delay-${(i + 1) * 100}`} style={{
                background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
                borderRadius: 'var(--radius)', padding: '2rem 1.5rem', textAlign: 'center',
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(229,62,62,0.3)'; e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: 56, height: 56, borderRadius: 14, background: 'rgba(229,62,62,0.12)', border: '1px solid rgba(229,62,62,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.4rem', margin: '0 auto 1.25rem', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.75rem' }}>{v.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title anim-fade-in-down">Meet the <span className="text-gradient">Team</span></h2>
            <div className="divider" style={{ margin: '0.75rem auto 1rem' }} />
            <p className="section-subtitle">The people behind Cartworx</p>
          </div>
          <div className="grid-4">
            {team.map((member, i) => (
              <div key={member.name} className={`anim-scale-bounce delay-${(i + 1) * 100}`} style={{
                background: 'var(--bg-card)', border: '1px solid var(--bg-border)',
                borderRadius: 'var(--radius)', padding: '2rem 1.5rem', textAlign: 'center',
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(229,62,62,0.3)'; e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: '100px', height: '100px', margin: '0 auto 1.25rem', borderRadius: '50%', overflow: 'hidden', border: '3px solid var(--primary-glow)', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(229,62,62,0.4)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ fontWeight: 700, marginBottom: '0.3rem' }}>{member.name}</h3>
                <p style={{ color: 'var(--primary-light)', fontSize: '0.85rem', fontWeight: 500 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--bg-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, marginBottom: '1rem' }}>
            Ready to Start <span className="text-gradient">Shopping?</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '1.05rem' }}>
            Join thousands of happy customers and discover amazing products.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn-primary" style={{ padding: '0.9rem 2rem' }}>
              <FiShoppingBag /> Shop Now
            </Link>
            <Link to="/register" className="btn-outline" style={{ padding: '0.9rem 2rem' }}>
              Create Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
