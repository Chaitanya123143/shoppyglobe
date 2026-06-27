import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <div className="img-wrapper">
        <img src={product.thumbnail} alt={product.title} loading="lazy" />
      </div>
      <div className="card-info">
        <div>
          <h3 className="product-title">{product.title}</h3>
          <div className="product-meta">
            <span className="product-price">${product.price}</span>
            <span className="product-rating">⭐ {product.rating || '4.5'}</span>
          </div>
        </div>
        <div className="card-buttons">
          <Link to={`/product/${product.id}`} className="view-btn">Details</Link>
          <button onClick={() => dispatch(addToCart(product))} className="add-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;