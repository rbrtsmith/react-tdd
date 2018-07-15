import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
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

const flushAllPromises = () => new Promise(resolve => setTimeout(resolve, 0));

const render = () => mount(
  <Provider store={store()}>
    <Products />
  </Provider>
);

test('render loading state followed by products', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const component = render();

  expect(component.find('[data-test-id="loading-products"]').text()).toBe('Loading…');
  expect(component.find('[data-test-id="products"]').exists()).toBe(false);

  await flushAllPromises();
  component.update();

  expect(component.find('[data-test-id="product-0"]').text()).toMatch('iPhone X');
  expect(component.find('[data-test-id="product-1"]').text()).toMatch('iPhone 7');
  expect(component.find('[data-test-id="loading-products"]').exists()).toBe(false);
});

test('render error message if products fail to load', async () => {
  axios.get.mockReturnValue(new Promise((resolve, reject) => reject('some error')));

  const component = render();
  expect(component.find('[data-test-id="loading-products"]').text()).toBe('Loading…');
  expect(component.find('[data-test-id="products-error"]').exists()).toBe(false);

  await flushAllPromises();
  component.update();
  expect(component.find('[data-test-id="loading-products"]').exists()).toBe(false);
  expect(component.find('[data-test-id="products-error"]').text()).toBe('Failed to load products');
});

test('favourite and unfavourite products', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const component = render();
  await flushAllPromises();
  component.update();

  const getProduct = index => component.find(`[data-test-id="product-${index}"]`);
  const getButton = index => component.find(`[data-test-id="product-${index}"] [data-test-id="product-favourite"]`);

  expect(getProduct(0).prop('style')).toEqual({
    backgroundColor: 'inherit'
  });
  expect(getButton(0).text()).toBe('Favourite this product');
  expect(getProduct(1).prop('style')).toEqual({
    backgroundColor: 'inherit'
  });
  expect(getButton(1).text()).toBe('Favourite this product');

  getButton(0).simulate('click');
  getButton(1).simulate('click');
  expect(getProduct(0).prop('style')).toEqual({
    backgroundColor: 'red'
  });
  expect(getButton(0).text()).toBe('Unfavourite this product');
  expect(getProduct(1).prop('style')).toEqual({
    backgroundColor: 'red'
  });
  expect(getButton(1).text()).toBe('Unfavourite this product');

  getButton(0).simulate('click');
  expect(getProduct(0).prop('style')).toEqual({
    backgroundColor: 'inherit'
  });
  expect(getButton(0).text()).toBe('Favourite this product');
  expect(getProduct(1).prop('style')).toEqual({
    backgroundColor: 'red'
  });
  expect(getButton(1).text()).toBe('Unfavourite this product');
});

test('sort products by price in ascending and descending order', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const component = render();
  await flushAllPromises();
  component.update();

  component.find('[data-test-id="products-sort"]').simulate('change', { target: { value: 'PRICE_ASCENDING' }});
  component.update();
  expect(component.find('[data-test-id="product-0"]').text()).toMatch('£600');
  expect(component.find('[data-test-id="product-1"]').text()).toMatch('£800');

  component.find('[data-test-id="products-sort"]').simulate('change', { target: { value: 'PRICE_DESCENDING' }});
  component.update();

  expect(component.find('[data-test-id="product-0"]').text()).toMatch('£800');
  expect(component.find('[data-test-id="product-1"]').text()).toMatch('£600');
});

test('render products sorted by price descending by default', async () => {
  axios.get.mockReturnValue(new Promise(resolve => resolve(products)));
  const component = render();
  await flushAllPromises();
  component.update();

  expect(component.find('[data-test-id="product-0"]').text()).toMatch('£800');
  expect(component.find('[data-test-id="product-1"]').text()).toMatch('£600');
});
