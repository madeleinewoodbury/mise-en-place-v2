import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const RecipeInstructions = ({ recipe: { ingredients, instructions } }) => {
  const ingredientsList = ingredients.map((item, id) => (
    <li key={id}>{item}</li>
  ));
  return (
    <Fragment>
      <div className="ingredients bg-white p-2">
        <h2 className="text-primary">Ingredients</h2>
        <ul>{ingredientsList}</ul>
      </div>
      <div className="instructions bg-white p-2">
        <h2 className="text-primary">Instructions</h2>
        <div>
          <p>{instructions}</p>
        </div>
      </div>
    </Fragment>
  );
};

RecipeInstructions.propTypes = {
  recipe: PropTypes.object.isRequired
};

export default RecipeInstructions;
