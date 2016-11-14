import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Signup from './index';
const wrapper = shallow(<Signup/>);

test('Signup does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
