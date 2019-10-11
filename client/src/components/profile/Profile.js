import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileRecipes from './ProfileRecipes';
import { connect } from 'react-redux';
import { getProfile } from '../../actions/profile';
import { getRecipesByUserId } from '../../actions/recipes';
import PropTypes from 'prop-types';

const Profile = ({
  getProfile,
  getRecipesByUserId,
  profile: { profile, loading },
  recipes: { recipes },
  match
}) => {
  useEffect(() => {
    getProfile(match.params.id);
    getRecipesByUserId(match.params.id);
  }, [getProfile, getRecipesByUserId, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} recipes={recipes.length} />
            <ProfileRecipes />
            <button class="btn btn-light">View All John's Recipes</button>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfile: PropTypes.func.isRequired,
  getRecipesByUserId: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getProfile, getRecipesByUserId }
)(Profile);
