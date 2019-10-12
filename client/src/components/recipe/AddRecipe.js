import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../../actions/recipes';

const AddRecipe = ({ createRecipe, history }) => {
  const [formData, setFormData] = useState({
    category: '',
    name: '',
    description: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);
    createRecipe(formData, history);
  };

  const { category, name, description, ingredients, instructions } = formData;
  return (
    <Fragment>
      <h1 className="large text-primary">Add a New Recipe</h1>
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
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddRecipe.propTypes = {
  createRecipe: PropTypes.func.isRequired
};

export default connect(
  null,
  { createRecipe }
)(withRouter(AddRecipe));
