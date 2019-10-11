import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SocialLink from './SocialLink';

const ProfileTop = ({
  profile: {
    user: { name, avatar },
    status,
    location,
    website,
    social
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
          {social && (
            <Fragment>
              {social.twitter && (
                <SocialLink link={social.twitter} icon="fab fa-twitter fa-2x" />
              )}
              {social.facebook && (
                <SocialLink
                  link={social.facebook}
                  icon="fab fa-facebook fa-2x"
                />
              )}
              {social.linkedin && (
                <SocialLink
                  link={social.linkedin}
                  icon="fab fa-linkedin fa-2x"
                />
              )}
              {social.instagram && (
                <SocialLink
                  link={social.instagram}
                  icon="fab fa-instagram fa-2x"
                />
              )}
              {social.youtube && (
                <SocialLink link={social.youtube} icon="fab fa-youtube fa-2x" />
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileTop;
