import { GET_RECIPES, RECIPES_ERROR } from './types';
import axios from 'axios';

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
