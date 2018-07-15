import axios from 'axios';
import { 
  REQUEST_PRODUCTS,
  RECEIVE_PRODUCTS,
  REQUEST_PRODUCTS_ERROR,
  FAVOURITE_PRODUCT,
  UNFAVOURITE_PRODUCT,
  SORT_PRODUCTS
} from './types';

const requestProducts = () => ({
  type: REQUEST_PRODUCTS
});

const requestProductsError = () => ({
  type: REQUEST_PRODUCTS_ERROR
});

const receiveProducts = payload => ({
  type: RECEIVE_PRODUCTS,
  payload
});

const fetchProducts = () => dispatch => {
  dispatch(requestProducts());
  return axios.get('http://localhost:7001/products')
    .then(res => res.data)
    .then(products => dispatch(receiveProducts(products)))
    .catch(err => dispatch(requestProductsError()));
};

const favouriteProduct = payload => ({
  type: FAVOURITE_PRODUCT,
  payload
});

const unFavouriteProduct = payload => ({
  type: UNFAVOURITE_PRODUCT,
  payload
});

const sortProducts = payload => ({
  type: SORT_PRODUCTS,
  payload
});

export { fetchProducts, favouriteProduct, unFavouriteProduct, sortProducts };
