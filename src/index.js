import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { StyleRoot } from 'radium';
import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();
const rootElement = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <StyleRoot>
      <App />
    </StyleRoot>
  </Provider>,
  rootElement
);
