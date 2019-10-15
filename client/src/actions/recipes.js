import {
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_ERROR,
  RECIPES_SEARCH,
  CLEAR_RECIPE,
  UPDATE_LIKES,
  UPDATE_STARS,
  REMOVE_RECIPE
} from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get current user's recipes
export const getUserRecipes = () => async dispatch => {
  dispatch({
    type: CLEAR_RECIPE
  });
  try {
    const res = await axios.get('/api/recipes/me');
    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get all recipes
export const getRecipes = () => async dispatch => {
  dispatch({
    type: CLEAR_RECIPE
  });
  try {
    const res = await axios.get('/api/recipes');
    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get starred recipes
export const getStarredRecipes = () => async dispatch => {
  dispatch({
    type: CLEAR_RECIPE
  });
  try {
    const res = await axios.get('/api/recipes/me/star');
    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create a new recipe
export const createRecipe = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.post('/api/recipes', formData, config);

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
    dispatch(setAlert('Recipe Created', 'success'));
    history.push('/dashboard');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Update a recipe
export const updateRecipe = (recipeId, formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const res = await axios.put(`/api/recipes/${recipeId}`, formData, config);

    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
    dispatch(setAlert('Recipe Updated', 'success'));
    // Redirect back to recipe
    history.push(`/recipe/${recipeId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like to recipe
export const addLike = recipeId => async dispatch => {
  try {
    const res = await axios.put(`/api/recipes/like/${recipeId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove like from recipe
export const removeLike = recipeId => async dispatch => {
  try {
    const res = await axios.put(`/api/recipes/unlike/${recipeId}`);
    dispatch({
      type: UPDATE_LIKES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Star recipe
export const starRecipe = recipeId => async dispatch => {
  try {
    const res = await axios.put(`/api/recipes/star/${recipeId}`);
    dispatch({
      type: UPDATE_STARS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get recipe by id
export const getRecipeById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/recipes/${id}`);
    dispatch({
      type: GET_RECIPE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get recipe by user id
export const getRecipesByUserId = userId => async dispatch => {
  dispatch({
    type: CLEAR_RECIPE
  });
  try {
    const res = await axios.get(`/api/recipes/user/${userId}`);
    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Search for current user's recipes
export const searchUserRecipes = name => async dispatch => {
  try {
    const res = await axios.get(`/api/search/recipe/me/${name}`);
    dispatch({
      type: RECIPES_SEARCH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Search for recipes by name
export const searchRecipes = (category, name) => async dispatch => {
  try {
    const res = await axios.get(`/api/search/recipe/${category}/${name}`);
    dispatch({
      type: RECIPES_SEARCH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Search for starred recipes by name
export const searchStarredRecipes = name => async dispatch => {
  try {
    const res = await axios.get(`/api/search/recipe/star/${name}`);
    dispatch({
      type: RECIPES_SEARCH,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete recipe
export const deleteRecipe = (id, history) => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      const res = await axios.delete(`/api/recipes/${id}`);

      dispatch({
        type: REMOVE_RECIPE
      });
      dispatch(setAlert('Recipe deleted', 'success'));
      // Redirect back to dashboard
      history.push('/');
    } catch (err) {
      dispatch({
        type: RECIPE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
