import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RecipeItem from './RecipeItem';
import { connect } from 'react-redux';
import {
  getRecipes,
  searchRecipes,
  searchCategory
} from '../../actions/recipes';

const Recipes = ({
  getRecipes,
  searchRecipes,
  searchCategory,
  recipes: { recipes, loading }
}) => {
  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const [search, setSearchData] = useState('');
  const [category, setCategory] = useState('0');

  const handleSubmit = e => {
    e.preventDefault();
    if (search !== '') {
      searchRecipes(category, search);
    } else {
      searchCategory(category);
    }
    setSearchData('');
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="recipes">
            <h1 className="large text-primary">Recipes</h1>
            <div className="recipes-title">
              <h2>
                <i className="fas fa-blender"></i> Find Your New Favorite
                Recipe...
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
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Recipes.propTypes = {
  getRecipes: PropTypes.func.isRequired,
  searchRecipes: PropTypes.func.isRequired,
  searchCategory: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getRecipes, searchRecipes, searchCategory }
)(Recipes);
