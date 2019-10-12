import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
  return (
    <div className="dash-buttons my-1">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Recipe
      </Link>
      <Link to="/upload" className="btn btn-light">
        <i className="fas fa-portrait text-primary"></i> Edit Avatar
      </Link>
    </div>
  );
};

export default DashboardActions;
