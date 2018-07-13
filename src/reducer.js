import { combineReducers } from 'redux';

import { PRICE_DESCENDING } from './constants';
import { REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  FAVOURITE_PRODUCT,
  UNFAVOURITE_PRODUCT,
  SORT_PRODUCTS
  } from './types';

const defaultState = {
  loading: false,
  list: [],
  favourites: [],
  sortedBy: ''
}

const products = (state = defaultState, action) => {
  switch(action.type) {
    case REQUEST_PRODUCTS:
    return {
      ...state,
      loading: true
    }
    case RECEIVE_PRODUCTS:
    return {
      ...state,
      loading: false,
      list: action.payload
    }
    case FAVOURITE_PRODUCT:
      return {
       ...state,
       favourites: [
         ...state.favourites,
         action.payload
       ]
      }
    case UNFAVOURITE_PRODUCT:
      return {
        ...state,
        favourites: [
        ...state.favourites.filter(favourite => favourite !== action.payload)
      ]
    }
    case SORT_PRODUCTS:
      return {
        ...state,
        sortedBy: action.payload
      }
      default:
        return state;
  }
};

export default combineReducers({
  products
});
