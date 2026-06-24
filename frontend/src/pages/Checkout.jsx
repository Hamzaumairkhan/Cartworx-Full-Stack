import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiCreditCard, FiTruck, FiDollarSign, FiShoppingBag } from 'react-icons/fi';
import { selectCartItems, selectCartTotal, clearCart } from '../redux/cartSlice';
import { placeOrder } from '../redux/userSlice';
import toast from 'react-hot-toast';
import '../styles/cart.css';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const { token, user } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.user);

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const grand = cartTotal + shipping + tax;

  const [address, setAddress] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('COD');

  const handleChange = (e) => setAddress({ ...address, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.street || !address.city || !address.postalCode || !address.country) {
      toast.error('Please fill in all address fields');
      return;
    }
    const orderData = {
      items: cartItems.map((i) => ({ productID: i._id, quantity: i.quantity, price: i.price })),
      totalAmount: grand,
      address,
      paymentMethod,
    };
    const result = await dispatch(placeOrder({ orderData, token }));
    if (placeOrder.fulfilled.match(result)) {
      dispatch(clearCart());
      toast.success('Order placed successfully!');
      navigate('/order-success', { state: { order: result.payload } });
    } else {
      toast.error(result.payload || 'Failed to place order');
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="checkout-page">
      <div className="checkout-layout">
        <form onSubmit={handleSubmit}>
          {/* Shipping Address */}
          <div className="checkout-section">
            <h3 className="checkout-section-title">
              <span className="step-num">1</span>
              <FiMapPin /> Shipping Address
            </h3>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input name="fullName" className="form-input" placeholder="John Doe" value={address.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input name="city" className="form-input" placeholder="New York" value={address.city} onChange={handleChange} required />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Street Address</label>
              <input name="street" className="form-input" placeholder="123 Main Street, Apt 4B" value={address.street} onChange={handleChange} required />
            </div>
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Postal Code</label>
                <input name="postalCode" className="form-input" placeholder="10001" value={address.postalCode} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input name="country" className="form-input" placeholder="United States" value={address.country} onChange={handleChange} required />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="checkout-section">
            <h3 className="checkout-section-title">
              <span className="step-num">2</span>
              <FiCreditCard /> Payment Method
            </h3>
            <div className="payment-methods">
              {[
                { value: 'COD', name: 'Cash on Delivery', desc: 'Pay when you receive your order', icon: <FiDollarSign /> },
                { value: 'Card', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Amex accepted', icon: <FiCreditCard /> },
                { value: 'Transfer', name: 'Bank Transfer', desc: 'Direct bank transfer', icon: <FiTruck /> },
              ].map((m) => (
                <label key={m.value} className={`payment-method-option ${paymentMethod === m.value ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value={m.value}
                    checked={paymentMethod === m.value}
                    onChange={() => setPaymentMethod(m.value)}
                  />
                  <div className="payment-method-label">
                    <div className="method-name">{m.name}</div>
                    <div className="method-desc">{m.desc}</div>
                  </div>
                  <div className="payment-method-icon">{m.icon}</div>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem' }} disabled={loading}>
            {loading ? 'Placing Order...' : `Place Order — $${grand.toFixed(2)}`}
          </button>
        </form>

        {/* Order Summary */}
        <div>
          <div className="cart-summary-card">
            <h3 className="cart-summary-title">Order Summary</h3>
            <div style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {cartItems.map((item) => (
                <div key={item._id} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                  <div style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', background: 'var(--bg-card)', flexShrink: 0, border: '1px solid var(--bg-border)' }}>
                    {item.imageUrls?.[0] ? <img src={item.imageUrls[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiShoppingBag size={24} color="var(--text-dim)" /></div>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>x{item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', flexShrink: 0 }}>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--bg-border)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div className="cart-summary-row">
                <span className="label">Subtotal</span>
                <span className="value">${cartTotal.toFixed(2)}</span>
              </div>
              <div className={`cart-summary-row ${shipping === 0 ? 'free' : ''}`}>
                <span className="label">Shipping</span>
                <span className="value">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="cart-summary-row">
                <span className="label">Tax (8%)</span>
                <span className="value">${tax.toFixed(2)}</span>
              </div>
              <div className="cart-summary-total">
                <span className="total-label">Grand Total</span>
                <span className="total-value">${grand.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
