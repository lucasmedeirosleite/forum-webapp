import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import { BrowserRouter } from 'react-router-dom';

import App from './app/pages/app';
import reducers from './app/redux/reducers';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const app = (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
