import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowRight, FiArrowLeft, FiShoppingBag, FiTruck, FiShield, FiRefreshCw, FiStar, FiZap, FiCheckCircle, FiSmartphone, FiWatch, FiHome, FiActivity, FiBook } from 'react-icons/fi';
import { fetchProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 5);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const featured = products.slice(0, 8);

  // Static fallback showcase items (shown when DB has < 4 products)
  const showcaseFallback = [
    {
      _id: 'demo-1',
      name: 'Premium Sneakers',
      category: 'Footwear',
      price: 129.99,
      imageUrls: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&auto=format'],
    },
    {
      _id: 'demo-2',
      name: 'Wireless Headphones',
      category: 'Electronics',
      price: 89.99,
      imageUrls: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop&auto=format'],
    },
    {
      _id: 'demo-3',
      name: 'Smart Watch',
      category: 'Accessories',
      price: 199.99,
      imageUrls: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&auto=format'],
    },
    {
      _id: 'demo-4',
      name: 'Leather Backpack',
      category: 'Bags',
      price: 74.99,
      imageUrls: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop&auto=format'],
    },
  ];

  // Merge real products with fallback to always show 5 cards
  const showcaseItems = [
    ...products.slice(0, 5),
    ...showcaseFallback.slice(0, Math.max(0, 5 - products.length)),
  ].slice(0, 5); // Ensure exactly 5


  const features = [
    { icon: <FiTruck />, title: 'Free Shipping', desc: 'On orders over $50 worldwide' },
    { icon: <FiShield />, title: 'Secure Payment', desc: '100% protected transactions' },
    { icon: <FiRefreshCw />, title: 'Easy Returns', desc: '30-day hassle-free returns' },
    { icon: <FiZap />, title: 'Fast Delivery', desc: 'Get it within 2-3 business days' },
  ];

  return (
    <div style={{ paddingTop: '70px' }}>

      {/* ─── HERO ─── */}
      <section style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, var(--bg-black) 0%, var(--bg-dark) 50%, var(--bg-black) 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background elements */}
        <div style={{ position: 'absolute', top: '10%', right: '5%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(229,62,62,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(229,62,62,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(229,62,62,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
          <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', gap: '3rem' }}>
            {/* LEFT: Text Content */}
            <div>
              <div className="anim-fade-in-down" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                <FiZap style={{ color: 'var(--primary)' }} /> New arrivals every week
              </div>
              <h1 className="anim-fade-in-up delay-100" style={{ fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', fontFamily: "'Times New Roman', Times, serif", fontStyle: 'italic' }}>
                Shop the <span style={{ background: 'var(--gradient-red)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Future</span>
                <br />of Commerce
              </h1>
              <p className="anim-fade-in-up delay-200" style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem', maxWidth: 560 }}>
                Discover premium products curated for the modern shopper. From cutting-edge electronics to everyday essentials — all in one place.
              </p>
              <div className="anim-fade-in-up delay-300" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                  <FiShoppingBag /> Shop Now <FiArrowRight />
                </Link>
                <Link to="/about" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="anim-fade-in-up delay-400" style={{ display: 'flex', gap: '2.5rem', marginTop: '3.5rem', flexWrap: 'wrap' }}>
                {[
                  { value: '10K+', label: 'Products' },
                  { value: '50K+', label: 'Happy Customers' },
                  { value: '4.9★', label: 'Average Rating' },
                ].map((s) => (
                  <div key={s.label} style={{ transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                  >
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-light)' }}>{s.value}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT: Product Showcase Card — Full-image Spotlight Style */}
            <div className="hero-showcase anim-fade-in-up delay-200" style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {/* Glow */}
              <div style={{ position: 'absolute', inset: '-30px', background: 'radial-gradient(circle at center, rgba(229,62,62,0.2) 0%, transparent 65%)', borderRadius: '50%', pointerEvents: 'none' }} />

              {/* Outer wrapper */}
              <div style={{ width: '100%', maxWidth: '420px', position: 'relative' }}>



                {/* ── Main big card ── */}
                {showcaseItems.length > 0 && (() => {
                  const hero = showcaseItems[currentSlide] || showcaseItems[0];
                  const imgUrl = hero.imageUrls?.[0];
                  const isDemo = hero._id?.startsWith('demo-');
                  
                  const nextSlide = (e) => { e.preventDefault(); setCurrentSlide(p => (p + 1) % showcaseItems.length); };
                  const prevSlide = (e) => { e.preventDefault(); setCurrentSlide(p => (p - 1 + showcaseItems.length) % showcaseItems.length); };

                  return (
                    <Link
                      to={isDemo ? '/shop' : `/product/${hero._id}`}
                      style={{ display: 'block', textDecoration: 'none', borderRadius: 24, overflow: 'hidden', position: 'relative', boxShadow: '0 20px 50px rgba(0,0,0,0.4)', transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'none'}
                    >
                      {/* Full image */}
                      <div style={{ height: 380, position: 'relative', overflow: 'hidden', background: 'linear-gradient(145deg, #2a2020, #1a1a1a)' }}>
                        {imgUrl ? (
                          <img key={imgUrl} src={imgUrl} alt={hero.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease', animation: 'fadeIn 0.5s ease-in-out' }}
                            onMouseEnter={e => e.target.style.transform = 'scale(1.07)'}
                            onMouseLeave={e => e.target.style.transform = 'none'}
                          />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem', animation: 'fadeIn 0.5s ease-in-out' }}>🛍️</div>
                        )}

                        {/* Arrows */}
                        <div style={{ position: 'absolute', top: '50%', left: 10, transform: 'translateY(-50%)', zIndex: 10 }}>
                          <button onClick={prevSlide} style={{ background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}><FiArrowLeft /></button>
                        </div>
                        <div style={{ position: 'absolute', top: '50%', right: 10, transform: 'translateY(-50%)', zIndex: 10 }}>
                          <button onClick={nextSlide} style={{ background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(4px)' }}><FiArrowRight /></button>
                        </div>

                        {/* Progress dots */}
                        <div style={{ position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
                          {showcaseItems.map((_, idx) => (
                            <div key={idx} style={{ width: 8, height: 8, borderRadius: '50%', background: idx === currentSlide ? 'var(--primary)' : 'rgba(255,255,255,0.4)', transition: 'background 0.3s ease' }} />
                          ))}
                        </div>

                        {/* Dark gradient overlay at bottom */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%', background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, transparent 100%)', pointerEvents: 'none' }} />

                        {/* Discount badge — top right */}
                        <div style={{ position: 'absolute', top: 14, right: 14, background: 'var(--gradient-red)', borderRadius: 10, padding: '0.3rem 0.6rem', textAlign: 'center' }}>
                          <div style={{ fontSize: '0.9rem', fontWeight: 900, color: 'white', lineHeight: 1 }}>40%</div>
                          <div style={{ fontSize: '0.55rem', fontWeight: 700, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' }}>OFF</div>
                        </div>

                        {/* Category pill — bottom left inside image */}
                        <div style={{ position: 'absolute', bottom: 78, left: 14, background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 100, padding: '0.28rem 0.75rem' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{hero.category}</span>
                        </div>

                        {/* Price + rating row — bottom of image */}
                        <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through', lineHeight: 1 }}>${(Number(hero.price) * 1.67).toFixed(0)}</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>${Number(hero.price).toFixed(2)}</div>
                          </div>
                          {/* Stars + buyers */}
                          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 12, padding: '0.4rem 0.7rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: 2, justifyContent: 'center', marginBottom: 2 }}>
                              {[1,2,3,4,5].map(s => <span key={s} style={{ color: '#f6ad55', fontSize: '0.6rem' }}>★</span>)}
                            </div>
                            <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.7)', fontWeight: 600, whiteSpace: 'nowrap' }}>10K+ Happy Buyers</div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom info strip */}
                      <div style={{ background: '#1a1a1a', borderTop: '1px solid #2e2e2e', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>{hero.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.1rem' }}>Free Delivery · In Stock</div>
                        </div>
                        <div style={{ background: 'var(--gradient-red)', borderRadius: 10, padding: '0.4rem 0.8rem', fontSize: '0.72rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>
                          40% OFF
                        </div>
                      </div>
                    </Link>
                  );
                })()}



                {/* Floating accent dots */}
                <div style={{ position: 'absolute', top: 10, right: -14, width: 22, height: 22, borderRadius: '50%', background: 'var(--gradient-red)', opacity: 0.8, boxShadow: '0 0 20px rgba(229,62,62,0.7)' }} />
                <div style={{ position: 'absolute', bottom: 60, left: -10, width: 13, height: 13, borderRadius: '50%', background: 'rgba(229,62,62,0.6)', boxShadow: '0 0 12px rgba(229,62,62,0.5)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ─── FEATURES ─── */}
      <section className="reveal" style={{ padding: '5rem 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--bg-border)', borderBottom: '1px solid var(--bg-border)' }}>
        <div className="container">
          <div className="grid-4">
            {features.map((f, i) => (
              <div key={f.title} className={`anim-fade-in-up delay-${(i + 1) * 100}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.5rem', background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius)', transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), border-color 0.3s ease, box-shadow 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(229,62,62,0.3)'; e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.4)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: 'rgba(229,62,62,0.1)', border: '1px solid rgba(229,62,62,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', fontSize: '1.3rem', flexShrink: 0, transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)' }}>
                  {f.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.3rem' }}>{f.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED PRODUCTS ─── */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Featured <span className="text-gradient">Products</span></h2>
              <div className="divider" />
              <p className="section-subtitle" style={{ marginBottom: 0 }}>Handpicked selection of our best sellers</p>
            </div>
            <Link to="/shop" className="btn-outline" style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem' }}>
              View All <FiArrowRight />
            </Link>
          </div>

          {loading ? (
            <div className="loading-container">
              <div className="spinner" />
            </div>
          ) : (
            <div className="products-grid">
              {featured.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* ─── CATEGORIES ─── */}
      <section className="reveal" style={{ padding: '4rem 0', background: 'var(--bg-dark)', borderTop: '1px solid var(--bg-border)' }}>
        <div className="container">
          <h2 className="section-title anim-fade-in-down" style={{ textAlign: 'center', marginBottom: '0.5rem', fontFamily: "'Times New Roman', Times, serif", fontStyle: 'italic' }}>Shop by <span className="text-gradient">Category</span></h2>
          <div className="divider" style={{ margin: '0.75rem auto 2.5rem' }} />
          <div className="grid-3">
            {[
              { name: 'Electronics', icon: <FiSmartphone />, bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.3)' },
              { name: 'Clothing', icon: <FiShoppingBag />, bg: 'rgba(229,62,62,0.1)', border: 'rgba(229,62,62,0.3)' },
              { name: 'Accessories', icon: <FiWatch />, bg: 'rgba(237,137,54,0.1)', border: 'rgba(237,137,54,0.3)' },
              { name: 'Home & Garden', icon: <FiHome />, bg: 'rgba(72,187,120,0.1)', border: 'rgba(72,187,120,0.3)' },
              { name: 'Sports', icon: <FiActivity />, bg: 'rgba(236,201,75,0.1)', border: 'rgba(236,201,75,0.3)' },
              { name: 'Books', icon: <FiBook />, bg: 'rgba(159,122,234,0.1)', border: 'rgba(159,122,234,0.3)' },
            ].map((cat, i) => (
              <Link key={cat.name} to={`/shop?category=${cat.name}`} className={`anim-fade-in-up delay-${(i % 3 + 1) * 100}`} style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.5rem', background: cat.bg, border: `1px solid ${cat.border}`,
                borderRadius: 'var(--radius)', textDecoration: 'none',
                transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease', color: 'var(--text-white)',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <span style={{ fontSize: '2rem', display: 'flex', alignItems: 'center', transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)', color: 'var(--primary)' }}>{cat.icon}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{cat.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Explore collection →</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="reveal" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--bg-dark) 0%, var(--bg-card) 100%)',
            border: '1px solid var(--bg-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '4rem 3rem',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(229,62,62,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>

              {isAuthenticated ? (
                /* ── Already Logged In State ── */
                <>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(72,187,120,0.15)', border: '1px solid rgba(72,187,120,0.3)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#68d391', fontWeight: 600 }}>
                    <FiCheckCircle /> Member Benefits Active
                  </div>
                  <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', fontFamily: "'Times New Roman', Times, serif", fontStyle: 'italic' }}>
                    Welcome Back, <span className="text-gradient">{user?.name?.split(' ')[0] || 'Friend'}!</span>
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem' }}>
                    You're already logged in. Enjoy exclusive member discounts on our entire collection.
                  </p>
                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link to="/shop" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                      <FiShoppingBag /> Shop Now <FiArrowRight />
                    </Link>
                    <Link to="/dashboard" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1rem' }}>
                      My Orders
                    </Link>
                  </div>
                </>
              ) : (
                /* ── Guest State ── */
                <>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(229,62,62,0.15)', border: '1px solid rgba(229,62,62,0.3)', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 600 }}>
                    <FiStar /> Limited Time Offer
                  </div>
                  <h2 style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, marginBottom: '1rem', fontFamily: "'Times New Roman', Times, serif", fontStyle: 'italic' }}>
                    Get <span className="text-gradient">20% Off</span> Your First Order
                  </h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '2rem', maxWidth: 500, margin: '0 auto 2rem' }}>
                    Register today and enjoy exclusive discounts on our entire collection.
                  </p>
                  <Link to="/register" className="btn-primary" style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}>
                    Get Started Free <FiArrowRight />
                  </Link>
                </>
              )}

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
