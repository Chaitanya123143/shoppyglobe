import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';       // 1. Make sure this import exists!
import Checkout from './pages/Checkout';
import NotFound from './components/NotFound';

// Layout wrapper to include the Header on every page
const Layout = ({ children }) => (
  <>
    <Header />
    <div className="content-box">
      {children}
    </div>
  </>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><ProductList /></Layout>,
    errorElement: <NotFound />
  },
  {
    path: '/product/:id',
    element: <Layout><ProductDetail /></Layout>
  },
  {
    path: '/cart',                  // 2. Make sure this exact path is defined!
    element: <Layout><Cart /></Layout>
  },
  {
    path: '/checkout',
    element: <Layout><Checkout /></Layout>
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;