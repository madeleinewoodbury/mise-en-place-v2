import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import recipes from './recipes';

export default combineReducers({
  alert,
  auth,
  profile,
  recipes
});
