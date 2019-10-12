import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import RecipeTop from './RecipeTop';
import RecipeInstructions from './RecipeInstructions';
import { connect } from 'react-redux';
import { getRecipeById } from '../../actions/recipes';
import PropTypes from 'prop-types';

const Recipe = ({
  getRecipeById,
  recipes: { recipe, loading },
  auth,
  match
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
            <Link to="/" className="btn btn-light">
              Go Back
            </Link>
            {auth.isAuthenticated &&
              !auth.loading &&
              auth.user._id === recipe.user._id && (
                <Link
                  to={`/edit-recipe/${recipe._id}`}
                  className="btn btn-dark"
                >
                  Edit Recipe
                </Link>
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
  recipes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getRecipeById }
)(Recipe);
