import React from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import store from './store';
import Products from './Products';

render((
  <Provider store={store()}>
    <Products />
  </Provider>
), document.querySelector('#root'));
