import {
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_ERROR,
  RECIPES_SEARCH,
  CLEAR_RECIPE
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
