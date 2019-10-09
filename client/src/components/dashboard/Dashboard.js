import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import DashboardRecipes from './DashboardRecipes';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading }
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  const recipes = [
    {
      _id: 111,
      name: 'PJ Sandwich',
      category: 'Snacks',
      date: '2019-10-09T01:17:24.610+00:00',
      likes: 12
    },
    {
      _id: 112,
      name: 'Pizza',
      category: 'Dinner',
      date: '2019-11-09T01:17:24.610+00:00',
      likes: 23
    }
  ];

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
            <form className="dash-form">
              <input type="text" placeholder="Search..." name="search" />
              <button className="search-btn" type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          <DashboardRecipes recipes={recipes} />
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
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
