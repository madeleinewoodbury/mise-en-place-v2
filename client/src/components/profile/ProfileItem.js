import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileItem = ({
  profile: {
    location,
    status,
    user: { name, avatar, _id }
  }
}) => {
  return (
    <div className="profile bg-light">
      <div className="img-container">
        <img className="profile-img" src={avatar} alt="avatar" />
      </div>

      <div className="profile-info">
        <h2>{name}</h2>
        <p>{status}</p>
        <p>{location && <em>{location}</em>}</p>
      </div>
      <div>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileItem;
