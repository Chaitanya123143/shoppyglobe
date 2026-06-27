import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchVal = useSelector(state => state.search.query);
  const cartItems = useSelector(state => state.cart.items);
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo">🛍️ ShoppyGlobe</Link>
      <input 
        type="text" 
        placeholder="Search products..." 
        value={searchVal}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="search-input"
      />
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link">🛒 Cart ({totalCount})</Link>
      </nav>
    </header>
  );
};

export default Header;