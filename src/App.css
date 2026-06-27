import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Header from './components/Header';

// Performance Tuning: Code splitting via lazy loaded declarations
const ProductList = lazy(() => import('./pages/ProductList'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const NotFound = lazy(() => import('./components/NotFound'));

const MainLayout = () => (
  <>
    <Header />
    <main className="content-box">
      <Suspense fallback={<div className="status">Loading Content View...</div>}>
        <Outlet />
      </Suspense>
    </main>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Suspense fallback={<div>Loading...</div>}><NotFound /></Suspense>,
    children: [
      { index: true, element: <ProductList /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "checkout", element: <Checkout /> }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}