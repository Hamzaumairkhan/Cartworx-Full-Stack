import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiTrash2, FiShoppingBag, FiTag } from 'react-icons/fi';
import {
  selectCartItems, selectCartCount, selectCartTotal,
  removeFromCart, increaseQty, decreaseQty, clearCart,
} from '../redux/cartSlice';
import { fetchProducts } from '../redux/productSlice';
import '../styles/cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const count = useSelector(selectCartCount);
  const total = useSelector(selectCartTotal);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  if (items.length === 0) return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven&apos;t added anything yet.</p>
          <Link to="/shop" className="btn-primary">
            <FiShoppingBag /> Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-layout">
        {/* Items */}
        <div>
          <div className="cart-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2>Shopping Cart</h2>
              <span className="cart-count">{count} items</span>
            </div>
            <button className="cart-clear-btn" onClick={() => dispatch(clearCart())}>
              <FiTrash2 /> Clear all
            </button>
          </div>

          <div className="cart-items-list">
            {items.map((item) => (
              <div className="cart-item" key={item._id}>
                {/* Image */}
                <div className="cart-item-img">
                  {item.imageUrls?.[0] ? (
                    <img src={item.imageUrls[0]} alt={item.name} />
                  ) : (
                    <div className="cart-item-img-placeholder">🛍️</div>
                  )}
                </div>

                {/* Info */}
                <div className="cart-item-info">
                  <p className="cart-item-category">{item.category}</p>
                  <h4 className="cart-item-name">{item.name}</h4>
                  <p className="cart-item-price">
                    Unit price: <span>${Number(item.price).toFixed(2)}</span>
                  </p>
                </div>

                {/* Controls */}
                <div className="cart-item-controls">
                  <div className="cart-qty-control">
                    <button className="cart-qty-btn" onClick={() => dispatch(decreaseQty(item._id))}>−</button>
                    <span className="cart-qty-value">{item.quantity}</span>
                    <button className="cart-qty-btn" onClick={() => dispatch(increaseQty(item._id))}>+</button>
                  </div>
                  <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
                  <button className="cart-remove-btn" onClick={() => dispatch(removeFromCart(item._id))}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <div className="cart-summary-card">
            <h3 className="cart-summary-title">Order Summary</h3>

            <div className="cart-summary-row">
              <span className="label">Subtotal ({count} items)</span>
              <span className="value">${total.toFixed(2)}</span>
            </div>
            <div className={`cart-summary-row ${shipping === 0 ? 'free' : ''}`}>
              <span className="label">Shipping</span>
              <span className="value">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-row">
              <span className="label">Tax (8%)</span>
              <span className="value">${tax.toFixed(2)}</span>
            </div>

            {total < 50 && (
              <div style={{ background: 'rgba(237,137,54,0.1)', border: '1px solid rgba(237,137,54,0.2)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', fontSize: '0.8rem', color: '#f6ad55', marginBottom: '0.75rem' }}>
                Add <strong>${(50 - total).toFixed(2)}</strong> more to get free shipping!
              </div>
            )}

            <div className="cart-summary-total">
              <span className="total-label">Total</span>
              <span className="total-value">${grandTotal.toFixed(2)}</span>
            </div>

            {/* Promo */}
            <div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FiTag /> Have a promo code?
              </p>
              <div className="promo-input-group">
                <input type="text" className="promo-input" placeholder="Enter code" />
                <button className="promo-btn">Apply</button>
              </div>
            </div>

            <Link to="/checkout" className="checkout-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              Proceed to Checkout →
            </Link>

            <Link to="/shop" className="continue-shopping">
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
