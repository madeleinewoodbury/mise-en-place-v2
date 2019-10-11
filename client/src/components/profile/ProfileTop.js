import React from 'react';
import PropTypes from 'prop-types';
import SocialLink from './SocialLink';

const ProfileTop = ({
  profile: {
    user: { name, avatar, _id },
    status,
    location,
    website,
    social: { twitter, facebook, instagram, linkedin, youtube }
  }
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <div className="img-container">
        <img className="profile-img" src={avatar} alt="avatar" />
      </div>
      <div className="info">
        <h1 className="large">{name}</h1>
        <p className="lead">{status}</p>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
          {website && <SocialLink link={website} icon="fas fa-globe fa-2x" />}
          {twitter && <SocialLink link={twitter} icon="fab fa-twitter fa-2x" />}
          {facebook && (
            <SocialLink link={facebook} icon="fab fa-facebook fa-2x" />
          )}
          {linkedin && (
            <SocialLink link={linkedin} icon="fab fa-linkedin fa-2x" />
          )}
          {instagram && (
            <SocialLink link={instagram} icon="fab fa-instagram fa-2x" />
          )}
          {youtube && <SocialLink link={youtube} icon="fab fa-youtube fa-2x" />}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
