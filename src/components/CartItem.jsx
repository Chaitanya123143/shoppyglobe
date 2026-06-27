import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} />
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h4>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>₹{item.customPrice.toLocaleString('en-IN')}</p>
        
        <div className="qty-controls">
          <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
        </div>
        
        <button onClick={() => dispatch(removeFromCart(item.id))} className="del-btn">Remove Item</button>
      </div>
    </div>
  );
};

export default CartItem;