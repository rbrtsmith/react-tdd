import { combineReducers } from 'redux';

import {
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCTS_ERROR,
  FAVOURITE_PRODUCT,
  UNFAVOURITE_PRODUCT,
  SORT_PRODUCTS
} from './types';

const defaultState = {
  loading: false,
  error: false,
  list: [],
  favourites: [],
  sortedBy: ''
};

const products = (state = defaultState, action) => {
  switch(action.type) {
    case REQUEST_PRODUCTS:
    return {
      ...state,
      error: false,
      loading: true
    }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        loading: false,
        list: action.payload
      };
    case REQUEST_PRODUCTS_ERROR:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FAVOURITE_PRODUCT:
      return {
       ...state,
       favourites: [
         ...state.favourites,
         action.payload
       ]
      };
    case UNFAVOURITE_PRODUCT:
      return {
        ...state,
        favourites: [
          ...state.favourites.filter(favourite => favourite !== action.payload)
        ]
      };
    case SORT_PRODUCTS:
      return {
        ...state,
        sortedBy: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  products
});
