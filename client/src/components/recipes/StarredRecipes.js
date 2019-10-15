import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getStarredRecipes, searchStarredRecipes } from '../../actions/recipes';

const StarredRecipes = ({
  getStarredRecipes,
  searchStarredRecipes,
  recipes: { recipes, loading }
}) => {
  useEffect(() => {
    getStarredRecipes();
  }, [getStarredRecipes]);
  const [search, setSearchData] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    console.log(search);
    if (search !== '') {
      searchStarredRecipes(search);
    } else {
      getStarredRecipes();
    }
    setSearchData('');
  };
  return (
    <Fragment>
      {recipes === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="recipes">
            <h1 className="large text-primary">Favorites</h1>
            {recipes.length > 0 ? (
              <Fragment>
                <div className="recipes-title">
                  <h2>
                    <i className="fas fa-star"></i> All Your Favorite Recipes
                  </h2>
                  <form className="search-form" onSubmit={e => handleSubmit(e)}>
                    <input
                      type="text"
                      placeholder="Search..."
                      name="search"
                      value={search}
                      onChange={e => setSearchData(e.target.value)}
                    />
                    <button className="search-btn" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>

                <div className="recipes-list">
                  {recipes.map(recipe => (
                    <RecipeItem key={recipe._id} recipe={recipe} />
                  ))}
                </div>
              </Fragment>
            ) : (
              <Fragment>
                <div className="no-favorites">
                  <div>
                    <p className="lead">
                      No recipes have been added to your favorites...
                    </p>
                    <p>
                      To add a favorite, click on the star on the recipe you
                      would like to add
                    </p>
                  </div>
                  <div>
                    <Link className="btn btn-light my-1" to="/recipes">
                      Back to All Recipes
                    </Link>
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

StarredRecipes.propTypes = {
  getStarredRecipes: PropTypes.func.isRequired,
  searchStarredRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getStarredRecipes, searchStarredRecipes }
)(StarredRecipes);
