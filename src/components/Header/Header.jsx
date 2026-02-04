import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-bottom mb-4">
      <div className="container-fluid py-4">
        <div className="text-center">
          <h1 className="display-4 fw-bold text-primary mb-2">
            <i className="bi bi-scales me-3"></i>
            BISS Case Law Explorer
          </h1>
          <p className="lead text-muted mb-0">
            Advanced Legal Research Platform
            <span className="badge bg-primary ms-2">v2.0</span>
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;