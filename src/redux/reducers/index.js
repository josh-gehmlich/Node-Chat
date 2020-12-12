import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import websockets from './websockets';
import messages from './messages';

export default combineReducers({
  router,
  websockets,
  messages,
});