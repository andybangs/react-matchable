import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRedirect, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';
import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <StyleRoot>
      <Router history={appHistory}>
        <Route path="/">
          <IndexRedirect to="/quizzes/0" />
          <Route path="quizzes/:id" component={App} />
        </Route>
      </Router>
    </StyleRoot>
  </Provider>,
  rootElement
);
