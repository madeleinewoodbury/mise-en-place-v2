import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getUserRecipes, searchUserRecipes } from '../../actions/recipes';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import DashboardRecipes from './DashboardRecipes';

const Dashboard = ({
  getCurrentProfile,
  getUserRecipes,
  searchUserRecipes,
  auth: { user },
  profile: { profile, loading },
  recipes: { recipes }
}) => {
  useEffect(() => {
    getCurrentProfile();
    getUserRecipes();
  }, []);

  const [search, setSearchData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (search !== '') {
      searchUserRecipes(search);
    } else {
      getUserRecipes();
    }
    setSearchData('');
  };

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div className="dashboard">
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <div className="recipes-title my-1">
            <h2 className="text-primary">My Recipes</h2>
            <form className="search-form" onSubmit={e => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Search..."
                name="search"
                value={search}
                onChange={e => setSearchData(e.target.value)}
              />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          {recipes !== null && <DashboardRecipes recipes={recipes} />}
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet set up a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getUserRecipes: PropTypes.func.isRequired,
  searchUserRecipes: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getUserRecipes, searchUserRecipes }
)(Dashboard);
