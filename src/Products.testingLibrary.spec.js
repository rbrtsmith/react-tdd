import React from 'react'
import { Provider } from 'react-redux';
import {render, fireEvent, cleanup, waitForElement, within } from 'react-testing-library'
import 'jest-dom/extend-expect'
import axios from 'axios';

import Products from './Products';
import store from './store';

jest.mock('axios');

const products = { data:[{
  id: "0",
  heading: "iPhone X",
  price: "800"
}, {
  id: "1",
  heading: "iPhone 7",
  price: "600"
}] };

afterEach(cleanup);

const renderComponent = () => render(
  <Provider store={store()}>
    <Products />
  </Provider>
);

test('render loading state followed by products', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const { queryByText, getByText } = renderComponent();

  expect(queryByText('Loading…')).toBeInTheDOM();
  expect(queryByText('iPhone X')).not.toBeInTheDOM();

  await waitForElement(() => getByText('Products'));
  expect(queryByText('Loading…')).not.toBeInTheDOM();
  expect(queryByText('iPhone X')).toBeInTheDOM();
  expect(queryByText('iPhone 7')).toBeInTheDOM();
});

test('render error message if products fail to load', async () => {
  axios.get.mockReturnValue(new Promise((resolve, reject) => reject('some error')));

  const { queryByText, getByText, debug } = renderComponent();

  expect(queryByText('Loading…')).toBeInTheDOM();
  expect(queryByText('Failed to load products')).not.toBeInTheDOM();

  await waitForElement(() => getByText('Failed to load products'));
  expect(queryByText('Failed to load products')).toBeInTheDOM();
});

test('favourite and unfavourite products', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const { getByText, container } = renderComponent();

  await waitForElement(() => getByText('Products'));
  const firstProduct = container.querySelector('[data-test-id="product-0"]');
  const firstProductFavouriteButton = within(firstProduct).getByText('Favourite this product');
  const secondProduct = container.querySelector('[data-test-id="product-1"]');
  const secondProductFavouriteButton = within(secondProduct).getByText('Favourite this product');

  expect(firstProduct).toHaveAttribute('style', 'background-color: inherit;');
  expect(secondProduct).toHaveAttribute('style', 'background-color: inherit;');

  fireEvent.click(firstProductFavouriteButton);
  expect(within(firstProduct).queryByText('Favourite this product')).not.toBeInTheDOM();
  expect(within(firstProduct).queryByText('Unfavourite this product')).toBeInTheDOM();
  expect(firstProduct).toHaveAttribute('style', 'background-color: red;');
  expect(within(secondProduct).queryByText('Favourite this product')).toBeInTheDOM();
  expect(within(secondProduct).queryByText('Unfavourite this product')).not.toBeInTheDOM();
  expect(secondProduct).toHaveAttribute('style', 'background-color: inherit;');

  fireEvent.click(secondProductFavouriteButton);
  expect(within(firstProduct).queryByText('Favourite this product')).not.toBeInTheDOM();
  expect(within(firstProduct).queryByText('Unfavourite this product')).toBeInTheDOM();
  expect(firstProduct).toHaveAttribute('style', 'background-color: red;');
  expect(within(secondProduct).queryByText('Favourite this product')).not.toBeInTheDOM();
  expect(within(secondProduct).queryByText('Unfavourite this product')).toBeInTheDOM();
  expect(secondProduct).toHaveAttribute('style', 'background-color: red;');

  fireEvent.click(firstProductFavouriteButton);
  expect(within(firstProduct).queryByText('Favourite this product')).toBeInTheDOM();
  expect(within(firstProduct).queryByText('Unfavourite this product')).not.toBeInTheDOM();
  expect(firstProduct).toHaveAttribute('style', 'background-color: inherit;');
  expect(within(secondProduct).queryByText('Favourite this product')).not.toBeInTheDOM();
  expect(within(secondProduct).queryByText('Unfavourite this product')).toBeInTheDOM();
  expect(secondProduct).toHaveAttribute('style', 'background-color: red;');
});

test('sort products by price in ascending and descending order', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const { getByText, getByLabelText, container } = renderComponent();

  await waitForElement(() => getByText('Products'));
  const getFirstProduct = () => container.querySelector('[data-test-id="product-0"]');
  const getSecondProduct = () => container.querySelector('[data-test-id="product-1"]');
  const sortSelect = getByLabelText(/Sort By/)

  sortSelect.value = 'PRICE_ASCENDING'
  fireEvent.change(sortSelect)
  expect(within(getFirstProduct()).queryByText(/£600/)).toBeInTheDOM();
  expect(within(getSecondProduct()).queryByText(/£800/)).toBeInTheDOM();

  sortSelect.value = 'PRICE_DESCENDING'
  fireEvent.change(sortSelect)
  expect(within(getFirstProduct()).queryByText(/£800/)).toBeInTheDOM();
  expect(within(getSecondProduct()).queryByText(/£600/)).toBeInTheDOM();
});

test('render products sorted by price descending by default', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const { getByText, container } = renderComponent();

  await waitForElement(() => getByText('Products'));
  const getFirstProduct = () => container.querySelector('[data-test-id="product-0"]');
  const getSecondProduct = () => container.querySelector('[data-test-id="product-1"]');

  expect(within(getFirstProduct()).queryByText(/£800/)).toBeInTheDOM();
  expect(within(getSecondProduct()).queryByText(/£600/)).toBeInTheDOM();
});
