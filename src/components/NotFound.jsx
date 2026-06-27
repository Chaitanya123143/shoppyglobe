import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const NotFound = () => {
  const error = useRouteError();

  return (
    <div className="not-found-container">
      <h2>⚠️ Error 404 - Page Not Found</h2>
      <p>The route you are looking for does not exist.</p>
      {error && (
        <blockquote className="error-log">
          <i>Details: {error.statusText || error.message || "Route undefined"}</i>
        </blockquote>
      )}
      <Link to="/" className="home-btn">Return to Homepage</Link>
    </div>
  );
};

export default NotFound;