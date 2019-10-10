import {
  GET_RECIPES,
  GET_RECIPE,
  RECIPE_ERROR,
  RECIPES_SEARCH,
  CLEAR_RECIPE
} from '../actions/types';

const initialState = {
  recipes: [],
  recipe: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_RECIPES:
    case RECIPES_SEARCH:
      return {
        ...state,
        recipes: payload,
        loading: false
      };
    case GET_RECIPE:
      return {
        ...state,
        recipe: payload,
        loading: false
      };
    case CLEAR_RECIPE:
      return {
        ...state,
        recipes: [],
        recipe: null,
        loading: false
      };
    case RECIPE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
