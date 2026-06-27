import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';
import { toggleWishlist } from '../store/userSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  // Safe navigation fallback to prevent breaking if user slice isn't loaded yet
  const wishlist = useSelector(state => state.user?.wishlist || []);
  const isWishlisted = wishlist.includes(product.id);
  const rupeePrice = Math.round(product.price * 85);

  return (
    <div className="product-card">
      <button 
        onClick={() => dispatch(toggleWishlist(product.id))}
        style={{ 
          position: 'absolute', 
          top: '10px', 
          right: '10px', 
          background: 'none', 
          border: 'none', 
          fontSize: '1.4rem', 
          cursor: 'pointer', 
          zIndex: '10', 
          color: isWishlisted ? 'red' : '#ccc' 
        }}
      >
        {isWishlisted ? '❤️' : '🤍'}
      </button>
      <div className="img-wrapper">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="card-info">
        <h3 className="product-title" title={product.title}>{product.title}</h3>
        <div className="product-meta">
          <span className="product-rating">★ {product.rating || '4.2'}</span>
          <span className="product-price">₹{rupeePrice.toLocaleString('en-IN')}</span>
        </div>
        <div className="card-buttons">
          <Link to={`/product/${product.id}`} className="view-btn">View</Link>
          <button 
            onClick={() => dispatch(addToCart({ ...product, customPrice: rupeePrice }))} 
            className="add-btn"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;