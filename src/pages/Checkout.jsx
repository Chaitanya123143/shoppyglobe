import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart?.items || []);
  const couponState = useSelector(state => state.coupon || { code: '', discountPercentage: 0, error: '' });
  
  const { discountPercentage = 0 } = couponState;
  const [form, setForm] = useState({ name: '', email: '', address: '' });

  // Strict number calculation loop to prevent NaN values
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item?.customPrice || Math.round((item?.price || 0) * 85);
    const qty = item?.quantity || 1;
    return acc + (price * qty);
  }, 0);

  const discountAmount = Math.round((subtotal * (discountPercentage || 0)) / 100);
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 149;
  const total = subtotal - discountAmount + shipping;

  const submitOrder = (e) => {
    e.preventDefault();
    alert("🎉 Order placed successfully! Your items will arrive soon.");
    dispatch(clearCart()); 
    navigate('/'); 
  };

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 1rem', background: 'white' }}>
        <p>No checkout elements found. Your cart is empty.</p>
        <button onClick={() => navigate('/')} className="view-btn" style={{ marginTop: '1rem' }}>Go to Store</button>
      </div>
    );
  }

  return (
    <div className="checkout-layout" style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
      <form onSubmit={submitOrder} className="checkout-form" style={{ background: 'white', padding: '20px', borderRadius: '4px', border: '1px solid #e0e0e0', flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3>Delivery & Shipping Details</h3>
        <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', padding: '12px', borderRadius: '4px' }}>
          <h4 style={{ color: '#388e3c', marginBottom: '4px' }}>⚡ Premium Shipping Assured</h4>
          <p style={{ fontSize: '0.85rem', color: '#555' }}>Order from your region qualifies for **Fastest Delivery** within 48 Hours.</p>
        </div>
        <input type="text" placeholder="Full Name" required style={{ padding: '8px', border: '1px solid #ccc' }} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email Address" required style={{ padding: '8px', border: '1px solid #ccc' }} onChange={e => setForm({...form, email: e.target.value})} />
        <textarea placeholder="Full Delivery Address" required style={{ padding: '8px', border: '1px solid #ccc', minHeight: '80px' }} onChange={e => setForm({...form, address: e.target.value})} />
        <button type="submit" className="add-btn" style={{ padding: '10px', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>Confirm Order (Cash on Delivery)</button>
      </form>
      
      <div className="summary-box" style={{ background: 'white', padding: '20px', borderRadius: '4px', border: '1px solid #e0e0e0', width: '40%', height: 'fit-content' }}>
        <h3 style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Order Summary</h3>
        {cartItems.map(i => {
          const price = i?.customPrice || Math.round((i?.price || 0) * 85);
          return (
            <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              <span>{i.title} (x{i.quantity || 1})</span>
              <span>`₹${(price * (i.quantity || 1)).toLocaleString('en-IN')}`</span>
            </div>
          );
        })}
        {discountPercentage > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--success)', fontWeight: '600' }}>
            <span>Promo Code Discount:</span>
            <span>-₹{(discountAmount || 0).toLocaleString('en-IN')}</span>
          </div>
        )}
        <div style={{ borderTop: '1px dashed #e0e0e0', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total Amount Payable:</span>
          <span style={{ color: '#2874f0' }}>₹{(total || 0).toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;