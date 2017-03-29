import React from 'react';
import test from 'ava';
import { shallow } from 'enzyme';
import nock from 'nock';
import { CityInput } from '../../../src/client/components/city-input/city-input';
import CityModel from '../../../src/models/CityModel';


const nockApi = body => nock('http://null/api/v1')
  .get('/cities/Bon')
  .reply(200, body);

test.beforeEach((t) => {
  const dispatch = () => {};
  t.context.wrapper = shallow(<CityInput dispatch={dispatch} />); // eslint-disable-line no-param-reassign
});

test('the state get updated with city name and country code', async (t) => {
  nockApi([new CityModel(123, 'Bon', 'GE')]);
  const wrapper = t.context.wrapper;

  wrapper.find('#input-city-name').simulate('change', { currentTarget: { value: 'Bon' } });

  await new Promise(res => setTimeout(res, 100));
  t.is(wrapper.state('inputCity'), 'Bon');
  t.is(wrapper.state('inputCountryCode'), 'ge');
  t.is(wrapper.state('selectedCityId'), 123);
});

test('the state get updated with city name only on multiple match', async (t) => {
  nockApi([new CityModel(123, 'Bon', 'GE'), new CityModel(123, 'Bon', 'DE')]);
  const wrapper = t.context.wrapper;

  wrapper.find('#input-city-name').simulate('change', { currentTarget: { value: 'Bon' } });

  await new Promise(res => setTimeout(res, 100));
  t.is(wrapper.state('inputCity'), 'Bon');
  t.is(wrapper.state('inputCountryCode'), '');
  t.is(wrapper.state('selectedCityId'), null);
});
