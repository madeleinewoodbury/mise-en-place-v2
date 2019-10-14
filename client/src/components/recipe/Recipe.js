import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import RecipeTop from './RecipeTop';
import RecipeInstructions from './RecipeInstructions';
import { connect } from 'react-redux';
import { getRecipeById, deleteRecipe } from '../../actions/recipes';
import PropTypes from 'prop-types';

const Recipe = ({
  getRecipeById,
  deleteRecipe,
  recipes: { recipe, loading },
  auth,
  match,
  history
}) => {
  useEffect(() => {
    getRecipeById(match.params.id);
  }, [getRecipeById, match.params.id]);

  return (
    <Fragment>
      {recipe === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="recipe">
            <button onClick={e => history.goBack()} className="btn btn-light">
              <i className="fas fa-arrow-left"></i> Go Back
            </button>
            {auth.isAuthenticated &&
              !auth.loading &&
              auth.user._id === recipe.user._id && (
                <Fragment>
                  <Link
                    to={`/edit-recipe/${recipe._id}`}
                    className="btn btn-success"
                  >
                    <i className="fas fa-edit"></i> Edit Recipe
                  </Link>
                  <button
                    onClick={e => deleteRecipe(recipe._id, history)}
                    className="btn btn-danger"
                  >
                    <i className="fas fa-trash-alt"></i> Delete Recipe
                  </button>
                </Fragment>
              )}
            <div className="recipe-grid my-1">
              <RecipeTop recipe={recipe} />
              <RecipeInstructions recipe={recipe} />
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Recipe.propTypes = {
  getRecipeById: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipeById, deleteRecipe }
)(Recipe);
