import { createSelector } from 'reselect';

import {
  PRICE_DESCENDING,
  PRICE_ASCENDING
} from './constants';

const selectProducts = state => state.products.list;
export const selectSortedBy = state => state.products.sortedBy;
export const selectProductsLoading = state => state.products.loading;
export const selectFavouritedProductIds = state => state.products.favourites;

export const selectSortedProducts = createSelector(selectProducts, selectSortedBy, (products, sortedBy) => {
  switch(sortedBy) {
    case PRICE_DESCENDING:
      return products.sort((b, a) => a.price - b.price);
    case PRICE_ASCENDING:
      return products.sort((a, b) => a.price - b.price);
    default:
      return products.sort((b, a) => a.price - b.price);
  }
});
