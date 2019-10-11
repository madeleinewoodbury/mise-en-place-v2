import React from 'react';
import PropTypes from 'prop-types';

const SocialLink = ({ link, icon }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <i className={icon}></i>
    </a>
  );
};

SocialLink.propTypes = {
  link: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired
};

export default SocialLink;
