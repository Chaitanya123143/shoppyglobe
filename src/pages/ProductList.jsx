import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from '../components/ProductItem';

const ProductList = () => {
  const { data: products, loading, error } = useFetchProducts('https://dummyjson.com/products');
  const query = useSelector(state => state.search.query);
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (loading) {
    return (
      <div className="grid-container">
        {[...Array(8)].map((_, i) => <div key={i} className="skeleton-card"></div>)}
      </div>
    );
  }

  if (error) return <p className="status err" style={{color: 'red', textAlign:'center', marginTop:'2rem'}}>⚠️ Connection Lost: {error}</p>;

  // Extract unique categories dynamically from the loaded array
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Apply search query text matching along with category pill filters
  const filtered = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Category Pills Slider Section */}
      <div className="category-container">
        {categories.map(cat => (
          <button 
            key={cat} 
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p style={{textAlign: 'center', margin: '3rem', color: '#64748b'}}>No products found matching your active criteria.</p>
      ) : (
        <div className="grid-container">
          {filtered.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;