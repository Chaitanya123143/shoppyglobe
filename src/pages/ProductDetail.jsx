import ReviewSection from '../components/ReviewSection';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import { addToCart } from '../store/cartSlice';

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data: product, loading, error } = useFetchProducts(`https://dummyjson.com/products/${id}`);

  if (loading) return <p className="status">Loading item specs...</p>;
  if (error) return <p className="status err">Error: {error}</p>;

  return (
    <div className="details-view">
      <Link to="/" className="view-btn" style={{ display: 'inline-block', width: 'auto', marginBottom: '15px' }}>← Back to Products</Link>
      <div style={{ display: 'flex', gap: '30px', alignItems: 'center', flexWrap: 'wrap' }}>
        <img src={product.thumbnail} alt={product.title} style={{ maxWidth: '300px', borderRadius: '8px' }} />
        <div>
          <h2>{product.title}</h2>
          <p className="desc">{product.description}</p>
          <p className="price" style={{ fontSize: '20px', fontWeight: 'bold', color: '#2563eb' }}>Price: ${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))} className="add-btn" style={{ padding: '10px 20px' }}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;