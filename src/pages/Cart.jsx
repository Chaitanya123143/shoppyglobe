import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.items);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99; // Mock extra feature logic: Free shipping over $100
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div style={{textAlign: 'center', padding: '4rem 1rem'}}>
        <h2 style={{marginBottom: '1rem'}}>Your Cart feels lonely!</h2>
        <p style={{color: '#64748b', marginBottom: '1.5rem'}}>Add items to get started.</p>
        <Link to="/" className="add-btn" style={{textDecoration: 'none', padding: '0.75rem 1.5rem'}}>Shop Our Catalog</Link>
      </div>
    );
  }

  return (
    <div className="cart-layout">
      <div>
        <h2 style={{marginBottom: '1.5rem'}}>Shopping Cart ({cartItems.length} unique items)</h2>
        {cartItems.map(item => <CartItem key={item.id} item={item} />)}
      </div>
      
      <div>
        <div className="summary" style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', position: 'sticky', top: '100px' }}>
          <h3 style={{marginBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem'}}>Order Summary</h3>
          <div style={{display:'flex', justifyContent:'between', marginBottom:'0.75rem'}}>
            <span style={{color: 'var(--text-muted)'}}>Subtotal:</span>
            <span style={{marginLeft:'auto', fontWeight:'600'}}>${subtotal.toFixed(2)}</span>
          </div>
          <div style={{display:'flex', justifyContent:'between', marginBottom:'0.75rem'}}>
            <span style={{color: 'var(--text-muted)'}}>Shipping:</span>
            <span style={{marginLeft:'auto', fontWeight:'600'}}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div style={{display:'flex', justifyContent:'between', marginTop:'1rem', paddingWith:'1rem', borderTop:'1px dashed #e2e8f0', paddingTop:'1rem', fontSize:'1.2rem', fontWeight:'700'}}>
            <span>Total Payable:</span>
            <span style={{marginLeft:'auto', color:'var(--primary)'}}>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="add-btn" style={{ textDecoration: 'none', display: 'block', textAlign: 'center', marginTop: '1.5rem', padding: '0.75rem' }}>
            Proceed to Checkout →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;