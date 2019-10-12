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
      {profile !== null ? (
        <Fragment>
          <div className="dash-top my-1 p-1">
            <h1 className="large text-white">
              Welcome {user && user.name.trim().split(' ')[0]}
            </h1>
            <div className="img-container">
              <img
                className="dash-img"
                src={profile.user.avatar}
                alt="avatar"
              />
            </div>
            <DashboardActions />
          </div>

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
          {recipes.length > 0 ? (
            <DashboardRecipes recipes={recipes} />
          ) : (
            <p>You have not added any recipes yet</p>
          )}
        </Fragment>
      ) : (
        <Fragment>
          <div className="dash-top my-1 p-1">
            <h1 className="large text-white">
              Welcome {user && user.name.trim().split(' ')[0]}
            </h1>
            <p className="lead">
              You have not yet set up a profile, please add some info
            </p>
            <Link to="/create-profile" className="btn btn-light my-1">
              <i className="fas fa-user-circle text-primary"></i> Create Profile
            </Link>
          </div>
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
