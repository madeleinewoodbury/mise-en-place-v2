import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RecipeItem = ({ recipe: { name, user, description, likes, _id } }) => {
  return (
    <div className="recipe bg-white p-1 my-1">
      <div>
        <h3>
          <a href="#" target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </h3>
        <h4 className="small-text">By: {user.name}</h4>
        <p>{description}</p>
        <p className="likes">
          <i className="far fa-thumbs-up"></i> Likes: {likes.length}
        </p>
      </div>
      <div>
        <Link to={`/recipe/${_id}`} className="btn btn-primary">
          View
        </Link>
      </div>
    </div>
  );
};

RecipeItem.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeItem;
