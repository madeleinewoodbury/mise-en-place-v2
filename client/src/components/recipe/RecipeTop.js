import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike } from '../../actions/recipes';

const RecipeTop = ({
  addLike,
  removeLike,
  recipe: { _id, name, description, likes, user, date }
}) => {
  return (
    <div className="recipe-info bg-primary p-2">
      <div className="description">
        <h1 className="large text-white">{name}</h1>
        <p>{description}</p>
        <button
          onClick={e => addLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{likes.length > 0 ? likes.length : null}</span>
        </button>
        <button
          onClick={e => removeLike(_id)}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down"></i>
        </button>
      </div>
      <div className="info-container text-center">
        <div>
          <img className="recipe-img" src={user.avatar} alt="avatar" />
        </div>

        <div>
          <h3>{user.name}</h3>
          <p className="small-text text-white">
            Posted: <Moment format="MM/DD/YYYY">{date}</Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

RecipeTop.propTypes = {
  recipe: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLike, removeLike }
)(RecipeTop);
