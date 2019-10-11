import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const ProfileAbout = ({
  profile: {
    user: { name },
    bio,
    favoriteFoods
  }
}) => {
  const foodsList = favoriteFoods.map(food => (
    <div className="p-1">
      <i className="fas fa-heart"></i> {food}
    </div>
  ));
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">About {name}</h2>
          <p>{bio}</p>
          <div className="line"></div>
        </Fragment>
      )}

      <h2 className="text-primary">Favorite Foods</h2>
      <div className="favorites">{foodsList}</div>
      <div className="line"></div>
      <h2 className="text-primary">Member Since</h2>
      <p>10/01/2019</p>
      <div className="line"></div>
      <h2 className="text-primary">Recipes Added</h2>
      <p>14</p>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
