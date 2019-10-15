import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeItem from './RecipeItem';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import {
  getStarredRecipes,
  searchStarredRecipes,
  searchStarredCategory
} from '../../actions/recipes';

const StarredRecipes = ({
  getStarredRecipes,
  searchStarredRecipes,
  searchStarredCategory,
  recipes: { recipes, loading }
}) => {
  useEffect(() => {
    getStarredRecipes();
  }, [getStarredRecipes]);
  const [search, setSearchData] = useState('');
  const [category, setCategory] = useState('0');

  const handleSubmit = e => {
    e.preventDefault();

    if (search !== '') {
      searchStarredRecipes(category, search);
    } else {
      searchStarredCategory(category);
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
                    <div className="form-group">
                      <select
                        name="category"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                      >
                        <option value="0">All Categories</option>
                        <option value="Breakfast">Breakfast</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Desserts">Desserts</option>
                        <option value="Drinks">Drinks</option>
                        <option value="Sides">Sides</option>
                        <option value="Breads">Breads</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
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
  searchStarredCategory: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getStarredRecipes, searchStarredRecipes, searchStarredCategory }
)(StarredRecipes);
