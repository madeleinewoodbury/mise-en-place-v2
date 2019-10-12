import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { editAvatar } from '../../actions/profile';
import PropTypes from 'prop-types';

const EditAvatar = ({ editAvatar, history }) => {
  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('No file selected');
  // const [uploadedFile, setUploadedFile] = useState({});

  const handleChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    editAvatar(formData, history);
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Choose Your Avatar</h1>
      <p className="lead">
        <i className="fas fa-portrait text-primary"></i> Select an image to go
        with your profile
      </p>
      <form className="file-form" onSubmit={e => handleSubmit(e)}>
        <div className="file-group">
          <div className="file-text">{fileName}</div>

          <div className="file-input">
            <label htmlFor="file" className="btn file-btn">
              <input type="file" id="file" onChange={e => handleChange(e)} />
              choose a file
            </label>
          </div>
        </div>
        <p>Max image size 3MB</p>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditAvatar.propTypes = {
  editAvatar: PropTypes.func.isRequired
};

export default connect(
  null,
  { editAvatar }
)(withRouter(EditAvatar));
