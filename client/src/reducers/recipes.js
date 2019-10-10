import { GET_RECIPES, RECIPES_ERROR, RECIPES_SEARCH } from '../actions/types';

const initialState = {
  recipes: [],
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
    case RECIPES_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}
