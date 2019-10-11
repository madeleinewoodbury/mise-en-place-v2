import React, { Fragment, useEffect } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

const Profiles = ({
  getProfiles,
  getRecipes,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {profiles.length === 0 || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">All Profiles</h1>
          <p className="lead">
            Browse and connect with fellow Food Enthusiasts
          </p>
          <form className="profiles-form">
            <input type="text" placeholder="Search..." name="search" />
            <button className="search-btn" type="submit">
              <i className="fa fa-search"></i>
            </button>
          </form>
          <div className="profiles my-2">
            {profiles.map(profile => (
              <ProfileItem key={profile._id} profile={profile} />
            ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  getRecipes: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(Profiles);
