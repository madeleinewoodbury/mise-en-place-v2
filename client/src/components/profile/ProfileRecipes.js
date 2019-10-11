import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProfileRecipes = ({ recipes }) => {
  const recentRecipes = recipes.slice(0, 3).map(recipe => (
    <div key={recipe._id} className="recipe bg-white p-1 my-1">
      <div>
        <h4>
          <Link
            to={`/recipe/${recipe._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {recipe.name}
          </Link>
        </h4>
        <p>{recipe.description}</p>
        <p className="likes">
          <i className="far fa-thumbs-up"></i> Likes: {recipe.likes.length}
        </p>
      </div>
      <div>
        <Link to={`/recipe/${recipe._id}`} className="btn btn-primary">
          View
        </Link>
      </div>
    </div>
  ));
  return (
    <div class="recipes-list">
      <h2 class="text-primary my-1">
        <i class="fas fa-blender"></i> Recent Recipes
      </h2>
      {recentRecipes}
    </div>
  );
};

ProfileRecipes.propTypes = {
  recipes: PropTypes.object.isRequired
};

export default ProfileRecipes;
