import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  
  // Calculate subtotal using the custom Rupee pricing
  const subtotal = cartItems.reduce((acc, item) => acc + (item.customPrice * item.quantity), 0);
  const shipping = subtotal > 4999 ? 0 : 149; // Free shipping over ₹4999
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '4rem 1rem', background: 'white'}}>
        <h2>Your Shopping Cart is Empty</h2>
        <p style={{color: '#878787', margin: '1rem 0 2rem'}}>Explore our products to add items.</p>
        <Link to="/" className="view-btn" style={{padding: '10px 30px', textDecoration:'none'}}>Shop Now</Link>
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
        <div style={{ background: 'white', padding: '1.5rem', border: '1px solid var(--border)' }}>
          <h3 style={{color: 'var(--text-muted)', fontSize: '1rem', textTransform: 'uppercase', paddingBottom: '1rem', borderBottom: '1px solid #f0f0f0'}}>Price Details</h3>
          <div style={{display:'flex', justifyContent:'space-between', margin:'1rem 0'}}>
            <span>Price ({cartItems.length} items):</span>
            <span>₹{subtotal.toLocaleString('en-IN')}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', margin:'1rem 0', borderBottom: '1px dashed #e0e0e0', paddingBottom: '1rem'}}>
            <span>Delivery Charges:</span>
            <span style={{color: shipping === 0 ? 'var(--success)' : '#212121'}}>
              {shipping === 0 ? 'FREE' : `₹${shipping}`}
            </span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between', margin:'1.5rem 0', fontSize:'1.2rem', fontWeight:'700'}}>
            <span>Total Amount:</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <Link to="/checkout" className="add-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', padding: '0.75rem', borderRadius: '2px' }}>
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;