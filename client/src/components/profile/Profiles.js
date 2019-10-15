import React, { Fragment, useEffect, useState } from 'react';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';
import { connect } from 'react-redux';
import { getProfiles, searchProfiles } from '../../actions/profile';
import PropTypes from 'prop-types';

const Profiles = ({
  getProfiles,
  searchProfiles,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [search, setSearch] = useState('');

  const handleChange = e => setSearch(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    if (search === '') {
      getProfiles();
    } else {
      searchProfiles(search);
    }
    setSearch('');
  };
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
          <form className="profiles-form" onSubmit={e => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Search..."
              name="search"
              value={search}
              onChange={e => handleChange(e)}
            />
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
  searchProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfiles, searchProfiles }
)(Profiles);
