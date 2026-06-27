import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from '../components/ProductItem';
import PromoBanner from '../components/PromoBanner';

const ProductList = () => {
  const { data: products, loading, error } = useFetchProducts('https://dummyjson.com/products');
  const query = useSelector(state => state.search.query);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('DEFAULT');

  if (loading) return <p style={{textAlign: 'center', marginTop: '3rem'}}>Loading Store Inventory...</p>;
  if (error) return <p style={{color: 'red', textAlign: 'center'}}>⚠️ Connection Error: {error}</p>;

  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Filter processing array
  let processedProducts = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Advanced Flipkart/Amazon Sorting Algorithm
  if (sortBy === 'PRICE_LOW_HIGH') {
    processedProducts.sort((a, b) => (a.price * 85) - (b.price * 85));
  } else if (sortBy === 'PRICE_HIGH_LOW') {
    processedProducts.sort((a, b) => (b.price * 85) - (a.price * 85));
  } else if (sortBy === 'TOP_RATED') {
    processedProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div>
      <PromoBanner />

      {/* Sorting Control Panel */}
      <div style={{ background: 'white', padding: '10px 20px', marginBottom: '15px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', border: '1px solid #e0e0e0' }}>
        <div className="category-container" style={{ margin: 0, padding: 0, border: 'none' }}>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#878787' }}>SORT BY:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            style={{ padding: '6px 12px', border: '1px solid #e0e0e0', borderRadius: '2px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer' }}
          >
            <option value="DEFAULT">Popularity</option>
            <option value="PRICE_LOW_HIGH">Price: Low to High</option>
            <option value="PRICE_HIGH_LOW">Price: High to Low</option>
            <option value="TOP_RATED">Customer Ratings</option>
          </select>
        </div>
      </div>

      <div className="grid-container">
        {processedProducts.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;