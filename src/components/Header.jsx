import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../store/searchSlice';
import { mockLogin, mockLogout } from '../store/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const searchVal = useSelector(state => state.search.query);
  const cartItems = useSelector(state => state.cart.items);
  const { isAuthenticated, profile } = useSelector(state => state.user || { isAuthenticated: false, profile: null });
  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="header">
      <Link to="/" className="logo" style={{ display: 'flex', flexDirection: 'column', lineHeight: '1' }}>
        <span>ShoppyGlobe</span>
        {isAuthenticated && <span style={{ fontSize: '0.65rem', color: 'var(--secondary)', fontStyle: 'normal', marginTop: '2px' }}>Explore Plus ✨</span>}
      </Link>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search for products, brands and more" 
          value={searchVal}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          className="search-input"
        />
      </div>
      
      <nav className="nav-links">
        {isAuthenticated ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: '600' }}>Hi, {profile.name.split(' ')[0]}</span>
            <button onClick={() => dispatch(mockLogout())} style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '4px 10px', borderRadius: '2px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' }}>Logout</button>
          </div>
        ) : (
          <button onClick={() => dispatch(mockLogin())} style={{ background: 'white', color: 'var(--primary)', border: 'none', padding: '6px 20px', borderRadius: '2px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' }}>Login</button>
        )}
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link" style={{ fontSize: '1rem' }}>
          🛒 Cart <span className="cart-count-badge">{totalCount}</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;