import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiStar, FiHeart } from 'react-icons/fi';
import { addToCart } from '../redux/cartSlice';
import toast from 'react-hot-toast';
import '../styles/products.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      return;
    }
    dispatch(addToCart(product));
    toast.success(`${product.name} added to cart!`, {
      style: { background: 'var(--bg-card)', color: 'white', border: '1px solid var(--bg-border)' },
      iconTheme: { primary: '#e53e3e', secondary: 'white' },
    });
  };

  const imageUrl = product.imageUrls?.[0];
  const isOutOfStock = product.stock === 0;

  return (
    <div className="product-card animate-fadeInUp">
      <Link to={`/product/${product._id}`}>
        {/* Image */}
        <div className="product-card-img">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} loading="lazy" />
          ) : (
            <div className="product-card-img-placeholder">
              🛍️
            </div>
          )}

          {/* Overlay */}
          <div className="product-card-overlay">
            <button className="product-quick-add" onClick={handleAddToCart} disabled={isOutOfStock}>
              <FiShoppingCart />
              {isOutOfStock ? 'Out of Stock' : 'Quick Add'}
            </button>
          </div>

          {/* Badges */}
          {isOutOfStock && <span className="product-badge" style={{ background: '#4a5568' }}>Sold Out</span>}
          {!isOutOfStock && product.stock <= 5 && (
            <span className="product-badge">Low Stock</span>
          )}

          {/* Wishlist */}
          <button className="product-wishlist-btn" onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}>
            <FiHeart />
          </button>
        </div>

        {/* Body */}
        <div className="product-card-body">
          <p className="product-category">{product.category}</p>
          <h3 className="product-name">{product.name}</h3>

          {/* Rating */}
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar
                  key={s}
                  fill={s <= Math.round(product.ratings || 0) ? '#f6ad55' : 'none'}
                  style={{ color: s <= Math.round(product.ratings || 0) ? '#f6ad55' : 'var(--text-dim)' }}
                />
              ))}
            </div>
            <span className="product-rating-count">({product.numReviews || 0})</span>
          </div>

          <div className="product-footer">
            <div className="product-price">
              <span className="currency">$</span>
              {Number(product.price).toFixed(2)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className={`product-stock ${isOutOfStock ? 'out-of-stock' : ''}`}>
                {isOutOfStock ? 'Out of stock' : `${product.stock} left`}
              </span>
              {!isOutOfStock && (
                <button
                  className="product-add-btn"
                  onClick={handleAddToCart}
                  title="Add to cart"
                >
                  +
                </button>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
