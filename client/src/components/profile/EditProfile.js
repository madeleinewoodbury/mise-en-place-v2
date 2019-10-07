import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    status: '',
    website: '',
    location: '',
    favoriteFoods: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: ''
  });

  useEffect(() => {
    getCurrentProfile();
    if (profile !== null) {
      setFormData({
        status: loading || !profile.status ? '' : profile.status,
        website: loading || !profile.website ? '' : profile.website,
        location: loading || !profile.location ? '' : profile.location,
        favoriteFoods:
          loading || !profile.favoriteFoods
            ? ''
            : profile.favoriteFoods.join(','),
        bio: loading || !profile.bio ? '' : profile.bio,
        twitter: loading || !profile.social ? '' : profile.social.twitter,
        facebook: loading || !profile.social ? '' : profile.social.facebook,
        linkedin: loading || !profile.social ? '' : profile.social.linkedin,
        youtube: loading || !profile.social ? '' : profile.social.youtube,
        instagram: loading || !profile.social ? '' : profile.social.instagram
      });
    }
  }, [loading, getCurrentProfile]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  const {
    status,
    website,
    location,
    favoriteFoods,
    bio,
    twitter,
    facebook,
    linkedin,
    instagram,
    youtube
  } = formData;
  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => handleChange(e)}>
            <option value="0">* Select Your Status</option>
            <option value="Professional Chef">Professional Chef</option>
            <option value="Home Chef">Home Chef</option>
            <option value="Professional Baker">Professional Baker</option>
            <option value="Cake Lover">Cake Lover</option>
            <option value="Butcher">Butcher</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Culinary Student">Culinary Student</option>
            <option value="Loves Cooking">Loves Cooking</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            City & state/country suggested (eg. Chicago, IL or Oslo, Norway)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Favorite Foods"
            name="favoriteFoods"
            value={favoriteFoods}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. chocolate, olives, bread,
            etc.)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={e => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <h3 className="text-primary">Social Network Links</h3>
        <div className="form-group social-input">
          <i className="fab fa-twitter fa-2x"></i>
          <input
            type="text"
            placeholder="Twitter URL"
            name="twitter"
            value={twitter}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-facebook fa-2x"></i>
          <input
            type="text"
            placeholder="Facebook URL"
            name="facebook"
            value={facebook}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-youtube fa-2x"></i>
          <input
            type="text"
            placeholder="YouTube URL"
            name="youtube"
            value={youtube}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-linkedin fa-2x"></i>
          <input
            type="text"
            placeholder="Linkedin URL"
            name="linkedin"
            value={linkedin}
            onChange={e => handleChange(e)}
          />
        </div>

        <div className="form-group social-input">
          <i className="fab fa-instagram fa-2x"></i>
          <input
            type="text"
            placeholder="Instagram URL"
            name="instagram"
            value={instagram}
            onChange={e => handleChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile }
)(withRouter(EditProfile));
