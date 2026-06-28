import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { applyCoupon, removeCoupon } from '../store/couponSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart?.items || []);
  const couponState = useSelector(state => state.coupon || { code: '', discountPercentage: 0, error: '' });
  
  const { code = '', discountPercentage = 0, error = '' } = couponState;
  const [couponInput, setCouponInput] = useState('');
  
  // Strict fallback validation to guarantee number types and prevent NaN leaks
  const subtotal = cartItems.reduce((acc, item) => {
    const price = item?.customPrice || Math.round((item?.price || 0) * 85);
    const qty = item?.quantity || 1;
    return acc + (price * qty);
  }, 0);

  const discountAmount = Math.round((subtotal * (discountPercentage || 0)) / 100);
  const shipping = subtotal > 4999 || subtotal === 0 ? 0 : 149;
  const total = subtotal - discountAmount + shipping;

  if (cartItems.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '4rem 1rem', background: 'white'}}>
        <h2>Your Shopping Cart is Empty</h2>
        <Link to="/" className="view-btn" style={{padding: '10px 30px', textDecoration:'none', display:'inline-block', marginTop:'10px'}}>Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div style={{background: 'white', padding: '10px 20px'}}>
        <h2 style={{fontSize: '1.2rem', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0'}}>My Cart ({cartItems.length})</h2>
        {cartItems.map(item => <CartItem key={item.id} item={item} />)}
      </div>
      
      <div>
        {/* Coupon Widget Box */}
        <div style={{ background: 'white', padding: '1.5rem', border: '1px solid #e0e0e0', marginBottom: '1rem' }}>
          <h4 style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: '#555' }}>Have a Promo Code? (Try: SG20)</h4>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input 
              type="text" 
              placeholder="Enter Code" 
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              style={{ padding: '6px', border: '1px solid #ccc', flex: 1, textTransform: 'uppercase' }}
            />
            <button onClick={() => dispatch(applyCoupon(couponInput))} style={{ background: '#2874f0', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', fontWeight: 'bold' }}>Apply</button>
          </div>
          {error && <p style={{ color: 'red', fontSize: '0.8rem', marginTop: '5px' }}>{error}</p>}
          {code && (
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f6ffed', padding: '6px', border: '1px solid #b7eb8f' }}>
              <span style={{ color: '#388e3c', fontSize: '0.85rem', fontWeight: 'bold' }}>✔ Code {code} Applied!</span>
              <button onClick={() => { dispatch(removeCoupon()); setCouponInput(''); }} style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' }}>Remove</button>
            </div>
          )}
        </div>

        {/* Dynamic Pricing Breakdown */}
        <div style={{ background: 'white', padding: '1.5rem', border: '1px solid #e0e0e0' }}>
          <h3 style={{color: '#878787', fontSize: '0.9rem', textTransform: 'uppercase', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0'}}>Price Details</h3>
          <div style={{display:'flex', justifyContent:'space-between', margin:'1rem 0'}}>
            <span>Price ({cartItems.length} items):</span>
            <span>₹{(subtotal || 0).toLocaleString('en-IN')}</span>
          </div>
          {discountPercentage > 0 && (
            <div style={{display:'flex', justifyContent:'space-between', margin:'1rem 0', color: 'var(--success)', fontWeight: '600'}}>
              <span>Coupon Discount ({discountPercentage}%):</span>
              <span>-₹{(discountAmount || 0).toLocaleString('en-IN')}</span>
            </div>
          )}
          <div style={{display:'flex', justifyContent:'space-between', margin:'1rem 0', borderBottom: '1px dashed #e0e0e0', paddingBottom: '1rem'}}>
            <span>Delivery Charges:</span>
            <span style={{color: shipping === 0 ? 'var(--success)' : '#212121'}}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', margin:'1.5rem 0', fontSize:'1.2rem', fontWeight:'700'}}>
            <span>Total Amount:</span>
            <span>₹{(total || 0).toLocaleString('en-IN')}</span>
          </div>
          <Link to="/checkout" className="add-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '2px' }}>Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;