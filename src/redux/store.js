import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware as router } from 'react-router-redux';
import thunk from 'redux-thunk';
import reducers from 'reducers';
import createHistory from 'history/createBrowserHistory';

export const history = createHistory();

const initialState = {};

const middleware = [thunk, router(history)];

const store = createStore(
  reducers,
  initialState,
  applyMiddleware(...middleware)
);

export default store;