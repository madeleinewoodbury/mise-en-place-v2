import { combineReducers } from 'redux';
import alert from './alert';
import auth from './';

export default combineReducers({
  alert,
  auth
});
