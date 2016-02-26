import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';
import configureStore from './store/configureStore';
import App from './containers/App';
import Home from './components/Home';

const store = configureStore();
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });
const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <StyleRoot>
      <Router history={appHistory}>
        <Route path="/" component={Home} />
        <Route path="/quiz/:id" component={App} />
      </Router>
    </StyleRoot>
  </Provider>,
  rootElement
);
