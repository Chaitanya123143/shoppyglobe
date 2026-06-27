import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../store/cartSlice';

const Checkout = () => {
  const cartItems = useSelector(state => state.cart.items);
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', address: '' });

  const submitOrder = (e) => {
    e.preventDefault();
    alert("Order placed successfully!");
    dispatch(clearCart());
    navigate('/');
  };

  return (
    <div className="checkout-layout">
      <form onSubmit={submitOrder} className="checkout-form">
        <h3>Checkout Shipping Form</h3>
        <input type="text" placeholder="Full Name" required onChange={e => setForm({...form, name: e.target.value})} />
        <input type="email" placeholder="Email Address" required onChange={e => setForm({...form, email: e.target.value})} />
        <textarea placeholder="Delivery Address" required onChange={e => setForm({...form, address: e.target.value})} />
        <button type="submit" className="order-btn">Place Order</button>
      </form>
      
      <div className="summary-box" style={{ background: 'white', padding: '20px', borderRadius: '6px', border: '1px solid #eee', width: '40%' }}>
        <h3>Order Summary</h3>
        {cartItems.map(i => <p key={i.id}>{i.title} (x{i.quantity}) - ${(i.price * i.quantity).toFixed(2)}</p>)}
        <h4>Total Pay: ${total.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default Checkout;