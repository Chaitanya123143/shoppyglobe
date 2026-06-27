import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className="cart-item">
      <img src={item.thumbnail} alt={item.title} loading="lazy" />
      <div>
        <h4>{item.title}</h4>
        <p>${item.price} each</p>
      </div>
      <div className="qty-controls">
        <button 
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button 
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
        >
          +
        </button>
      </div>
      <button onClick={() => dispatch(removeFromCart(item.id))} className="del-btn">Remove</button>
    </div>
  );
};

export default CartItem;