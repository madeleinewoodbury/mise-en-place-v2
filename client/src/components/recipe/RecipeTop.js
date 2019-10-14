import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, starRecipe } from '../../actions/recipes';

const RecipeTop = ({
  addLike,
  removeLike,
  starRecipe,
  loggedInUser,
  recipe: { _id, name, description, starred, likes, user, date }
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
        <button
          onClick={e => starRecipe(_id)}
          type="button"
          className={
            starred.includes(loggedInUser)
              ? 'btn btn-dark btn-star'
              : 'btn btn-dark'
          }
        >
          <i class="fas fa-star"></i>
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
  starRecipe: PropTypes.func.isRequired,
  loggedInUser: PropTypes.string.isRequired,
  removeLike: PropTypes.func.isRequired
};

export default connect(
  null,
  { addLike, removeLike, starRecipe }
)(RecipeTop);
