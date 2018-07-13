import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'

import reducer from './reducer';

const store = state => createStore(reducer, state, applyMiddleware(thunk));

export default store;
