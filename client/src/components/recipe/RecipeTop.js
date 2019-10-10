import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

const RecipeTop = ({
  recipe: { name, description, likes, avatar, author, date }
}) => {
  return (
    <div className="recipe-info bg-primary p-2">
      <div className="description">
        <h1 className="large text-white">{name}</h1>
        <p>{description}</p>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up"></i>{' '}
          <span>{likes.length > 0 ? likes.length : null}</span>
        </button>
        <button type="button" className="btn btn-light">
          <i className="fas fa-thumbs-down"></i>
        </button>
      </div>
      <div className="info-container text-center">
        <div>
          <img className="recipe-img" src={avatar} alt="avatar" />
        </div>

        <div>
          <h3>{author}</h3>
          <p className="small-text text-white">
            Posted: <Moment format="MM/DD/YYYY">{date}</Moment>
          </p>
        </div>
      </div>
    </div>
  );
};

RecipeTop.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeTop;
