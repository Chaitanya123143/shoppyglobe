import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  // Robust calculation fallback to guarantee a valid number before toLocaleString runs
  const itemPrice = item?.customPrice || Math.round((item?.price || 0) * 85);

  return (
    <div className="cart-item">
      <img src={item?.thumbnail || ''} alt={item?.title || 'Product Image'} />
      <div style={{ flex: 1 }}>
        <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item?.title || 'Unknown Product'}</h4>
        <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {/* Guaranteed safe parsing */}
          ₹{typeof itemPrice === 'number' ? itemPrice.toLocaleString('en-IN') : itemPrice}
        </p>
        
        <div className="qty-controls">
          <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
          <span>{item?.quantity || 1}</span>
          <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
        </div>
        
        <button onClick={() => dispatch(removeFromCart(item.id))} className="del-btn">Remove Item</button>
      </div>
    </div>
  );
};

export default CartItem;