import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RecipeItem from './RecipeItem';
import { connect } from 'react-redux';
import { getRecipes } from '../../actions/recipes';

const Recipes = ({ getRecipes, recipes: { recipes, loading } }) => {
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);
  return (
    <Fragment>
      {recipes === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="recipes">
            <h1 className="large text-primary">Recipes</h1>
            <p className="lead">
              <i className="fas fa-blender"></i> Find Your New Favorite
              Recipe...
            </p>
            <div className="recipes-list">
              {recipes.map(recipe => (
                <RecipeItem key={recipe._id} recipe={recipe} />
              ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
