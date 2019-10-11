import React from 'react';
import PropTypes from 'prop-types';

const ProfileRecipes = props => {
  return (
    <div class="recipes-list">
      <h2 class="text-primary my-1">
        <i class="fas fa-blender"></i> Recent Recipes
      </h2>
      <div class="recipe bg-white p-1 my-1">
        <div>
          <h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Pizza
            </a>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
          <p class="likes">
            <i class="far fa-thumbs-up"></i> Likes: 223
          </p>
        </div>
        <div>
          <a href="recipe.html" class="btn btn-primary">
            View
          </a>
        </div>
      </div>
      <div class="recipe bg-white p-1 my-1">
        <div>
          <h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Chicken Pot Pie
            </a>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
          <p class="likes">
            <i class="far fa-thumbs-up"></i> Likes: 71
          </p>
        </div>
        <div>
          <a href="recipe.html" class="btn btn-primary">
            View
          </a>
        </div>
      </div>
      <div class="recipe bg-white p-1 my-1">
        <div>
          <h4>
            <a href="#" target="_blank" rel="noopener noreferrer">
              Fish & Chips
            </a>
          </h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
            laborum!
          </p>
          <p class="likes">
            <i class="far fa-thumbs-up"></i> Likes: 15
          </p>
        </div>
        <div>
          <a href="recipe.html" class="btn btn-primary">
            View
          </a>
        </div>
      </div>
    </div>
  );
};

ProfileRecipes.propTypes = {};

export default ProfileRecipes;
