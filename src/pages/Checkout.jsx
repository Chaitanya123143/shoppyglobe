import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  
  // Fixed: Now reads customPrice instead of breaking on the old dollar price property
  const subtotal = cartItems.reduce((acc, item) => acc + (item.customPrice * item.quantity), 0);
  const shipping = subtotal > 4999 ? 0 : 149; 
  const total = subtotal + shipping;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const submitOrder = (e) => {
    e.preventDefault();
    alert("🎉 Order placed successfully! Your items will arrive soon.");
    dispatch(clearCart()); // Clear items via Redux
    navigate('/'); // Automatic home redirect
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
    <div className="checkout-layout">
      <form onSubmit={submitOrder} className="checkout-form">
        <h3>Delivery & Shipping Details</h3>
        <input type="text" placeholder="Full Name" required onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email Address" required onChange={e => setForm({...form, email: e.target.value})} />
        <textarea placeholder="Full Delivery Address" required onChange={e => setForm({...form, address: e.target.value})} />
        <button type="submit" className="order-btn">Confirm Order (Cash on Delivery)</button>
      </form>
      
      <div className="summary-box" style={{ background: 'white', padding: '20px', borderRadius: '4px', border: '1px solid #e0e0e0', width: '40%' }}>
        <h3 style={{ borderBottom: '1px solid #f0f0f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Order Summary</h3>
        {cartItems.map(i => (
          <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
            <span>{i.title} (x{i.quantity})</span>
            <span>₹{(i.customPrice * i.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
        <div style={{ borderTop: '1px dashed #e0e0e0', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>Total Amount Payable:</span>
          <span style={{ color: '#2874f0' }}>₹{total.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default Checkout;