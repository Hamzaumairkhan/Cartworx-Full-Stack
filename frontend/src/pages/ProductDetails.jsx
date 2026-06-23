import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiShoppingCart, FiArrowLeft, FiStar, FiPackage, FiTruck, FiShield } from 'react-icons/fi';
import { fetchProductById } from '../redux/productSlice';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import '../styles/products.css';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => state.products);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      navigate('/login');
      return;
    }
    for (let i = 0; i < qty; i++) dispatch(addToCart(product));
    toast.success(`${product.name} (x${qty}) added to cart!`, {
      style: { background: 'var(--bg-card)', color: 'white', border: '1px solid var(--bg-border)' },
      iconTheme: { primary: '#e53e3e', secondary: 'white' },
    });
  };

  if (loading) return (
    <div className="product-details-page">
      <div className="loading-container"><div className="spinner" /></div>
    </div>
  );

  if (error || !product) return (
    <div className="product-details-page">
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>😕</div>
        <h2>Product not found</h2>
        <button onClick={() => navigate('/shop')} className="btn-primary" style={{ marginTop: '1.5rem' }}>
          Back to Shop
        </button>
      </div>
    </div>
  );

  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-details-page">
      <div className="container" style={{ padding: '2rem 1.5rem 4rem' }}>
        {/* Breadcrumb */}
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.875rem', marginBottom: '2rem', transition: 'var(--transition)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--text-white)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          <FiArrowLeft /> Back
        </button>

        <div className="product-details-grid">
          {/* Image */}
          <div className="product-details-img">
            {product.imageUrls?.[0] ? (
              <img src={product.imageUrls[0]} alt={product.name} />
            ) : (
              <div style={{ width: '100%', height: '100%', minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '6rem', background: 'var(--bg-input)' }}>🛍️</div>
            )}
          </div>

          {/* Info */}
          <div className="product-details-info">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--primary-light)', display: 'block', marginBottom: '0.75rem' }}>
              {product.category}
            </span>

            <h1>{product.name}</h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '1rem 0' }}>
              <div style={{ display: 'flex', color: '#f6ad55' }}>
                {[1,2,3,4,5].map(s => (
                  <FiStar key={s} fill={s <= Math.round(product.ratings || 0) ? '#f6ad55' : 'none'} style={{ color: s <= Math.round(product.ratings || 0) ? '#f6ad55' : 'var(--text-dim)' }} />
                ))}
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>({product.numReviews || 0} reviews)</span>
            </div>

            <div className="product-details-price">${Number(product.price).toFixed(2)}</div>

            <p className="product-details-desc">{product.description}</p>

            {/* Stock Status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <FiPackage style={{ color: isOutOfStock ? 'var(--error)' : 'var(--success)' }} />
              <span style={{ fontSize: '0.9rem', color: isOutOfStock ? 'var(--error)' : 'var(--success)', fontWeight: 600 }}>
                {isOutOfStock ? 'Out of Stock' : `${product.stock} in stock`}
              </span>
            </div>

            {/* Quantity */}
            {!isOutOfStock && (
              <div className="quantity-control">
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 500 }}>Quantity:</span>
                <button className="quantity-btn" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span className="quantity-value">{qty}</span>
                <button className="quantity-btn" onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
              </div>
            )}

            {/* Actions */}
            <div className="product-actions">
              <button
                className="btn-primary"
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                style={{ opacity: isOutOfStock ? 0.5 : 1 }}
              >
                <FiShoppingCart />
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--bg-border)' }}>
              {[
                { icon: <FiTruck />, text: 'Free Shipping' },
                { icon: <FiShield />, text: 'Secure Pay' },
                { icon: <FiPackage />, text: '30-Day Returns' },
              ].map((b) => (
                <div key={b.text} style={{ textAlign: 'center', padding: '0.75rem', background: 'var(--bg-card)', border: '1px solid var(--bg-border)', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ color: 'var(--primary)', fontSize: '1.1rem', marginBottom: '0.3rem' }}>{b.icon}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{b.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
