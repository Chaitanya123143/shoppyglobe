import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  
  // Calculate a realistic price in Indian Rupees (USD Price * 85)
  const rupeePrice = Math.round(product.price * 85);

  return (
    <div className="product-card">
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