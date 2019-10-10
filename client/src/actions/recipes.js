import { GET_RECIPES, RECIPES_ERROR, RECIPES_SEARCH } from './types';
import axios from 'axios';
import { setAlert } from './alert';

// Get current user's recipes
export const getUserRecipes = () => async dispatch => {
  try {
    const res = await axios.get('/api/recipes/me');
    dispatch({
      type: GET_RECIPES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RECIPES_ERROR,
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
      type: RECIPES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
