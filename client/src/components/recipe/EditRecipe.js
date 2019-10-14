import React, { useEffect, useState, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRecipeById, updateRecipe } from '../../actions/recipes';

const EditRecipe = ({
  getRecipeById,
  updateRecipe,
  recipes: { recipe, loading },
  history,
  match
}) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    ingredients: '',
    instructions: ''
  });

  useEffect(() => {
    getRecipeById(match.params.id);

    if (recipe !== null) {
      setFormData({
        name: loading || !recipe.name ? '' : recipe.name,
        category: loading || !recipe.category ? '' : recipe.category,
        description: loading || !recipe.description ? '' : recipe.description,
        ingredients:
          loading || !recipe.ingredients ? '' : recipe.ingredients.join(','),
        instructions: loading || !recipe.instructions ? '' : recipe.instructions
      });
    }
  }, [loading, getRecipeById, match.params.id]);

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    updateRecipe(match.params.id, formData, history);
  };

  const { category, name, description, ingredients, instructions } = formData;

  return (
    <Fragment>
      <h1 className="large text-primary">Edit Recipe</h1>
      <small>* = required field</small>
      <form className="form" onSubmit={e => handleSubmit(e)}>
        <div className="form-group">
          <select
            name="category"
            value={category}
            onChange={e => handleChange(e)}
          >
            <option value="0">* Select a Category</option>
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
        <div className="form-group">
          <input
            type="text"
            placeholder="* Recipe Name"
            name="name"
            value={name}
            onChange={e => handleChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            placeholder="* Description"
            name="description"
            value={description}
            onChange={e => handleChange(e)}
          ></textarea>
          <small className="form-text">
            Write a short description of your recipe
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Ingredients"
            name="ingredients"
            value={ingredients}
            onChange={e => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. 2 cups milk, 3Tbs of sugar,
            1/4 cup butter etc.)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="* Instructions"
            name="instructions"
            value={instructions}
            onChange={e => handleChange(e)}
          ></textarea>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to={`/recipe/${match.params.id}`}>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditRecipe.propTypes = {
  getRecipeById: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  recipes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  recipes: state.recipes
});

export default connect(
  mapStateToProps,
  { getRecipeById, updateRecipe }
)(withRouter(EditRecipe));
