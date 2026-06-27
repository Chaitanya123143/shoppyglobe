import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from '../components/ProductItem';
import PromoBanner from '../components/PromoBanner';

const ProductList = () => {
  const { data: products, loading, error } = useFetchProducts('https://dummyjson.com/products');
  const query = useSelector(state => state.search.query);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) return <p style={{textAlign: 'center', marginTop: '3rem'}}>Loading Store Inventory...</p>;
  if (error) return <p style={{color: 'red', textAlign: 'center'}}>⚠️ Connection Error: {error}</p>;

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Moving Promo Banner Mounted on Top */}
      <PromoBanner />

      <div className="category-container">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid-container">
        {filtered.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;