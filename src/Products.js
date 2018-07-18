import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchProducts,
  favouriteProduct,
  unFavouriteProduct,
  sortProducts
} from './actions';
import {
  selectProductsLoading,
  selectProductsError,
  selectSortedProducts,
  selectFavouritedProductIds,
  selectSortedBy
} from './selectors';

class Products extends Component {
  componentDidMount = () =>
    this.props.fetchProducts();

  favouriteProduct = id =>
    this.props.favouriteProduct(id);

  unFavouriteProduct = id =>
    this.props.unFavouriteProduct(id);

  sortProducts = ({ target: { value }}) =>
    this.props.sortProducts(value);

  render() {
    const {
      loading,
      error,
      products,
      favourites,
      sortedBy
    } = this.props;
    if (loading) return <div data-test-id="loading-products">Loading…</div>
    if (error) return <div data-test-id="products-error">Failed to load products</div>

    return (
      <div data-test-id="products">
        <h2>Products</h2>
        <label htmlFor="products-sort">Sort By: {` `}</label>
        <select data-test-id="products-sort" id="products-sort" value={sortedBy} onChange={this.sortProducts}>
          <option value="PRICE_DESCENDING">Price descending</option>
          <option value="PRICE_ASCENDING">Price ascending</option>
        </select>
        {products.map(({ heading, price, id }, index) => (
          <div data-test-id={`product-${index}`} key={id} style={{
            backgroundColor: favourites.includes(id) ? 'red' : 'inherit'
          }}>
            <h2>{heading}</h2>
            <p>{`Cost: £${price}`}</p>
            <button data-test-id="product-favourite" onClick={() => {
              favourites.includes(id)
                ? this.unFavouriteProduct(id)
                : this.favouriteProduct(id)
            }}>
              {favourites.includes(id) ? 'Unfavourite' : 'Favourite'} this product
            </button>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loading: selectProductsLoading(state),
  error: selectProductsError(state),
  products: selectSortedProducts(state),
  favourites: selectFavouritedProductIds(state),
  sortedBy: selectSortedBy(state)
});

export default connect(mapStateToProps, {
  fetchProducts,
  favouriteProduct,
  unFavouriteProduct,
  sortProducts
})(Products);
