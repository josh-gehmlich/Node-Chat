import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'react-router-redux';
import store, { history } from 'store';
import { Route, Switch } from 'react-router-dom';
import { Home } from 'pages';
import { WSProvider } from 'components';
import { Main } from 'style';
import 'style/global';

const MainRoute = props => {
  return (
    <Main>
      <Route {...props} />
    </Main>
  );
};

const Root = () => (
  <Provider store={store}>
    <WSProvider>
      <Router history={history}>
        <Switch>
          <MainRoute exact path="/" component={Home} />
        </Switch>
      </Router>
    </WSProvider>
  </Provider>
);

export default Root;