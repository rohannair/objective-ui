import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import User from './index.jsx';
const wrapper = shallow(<User/>);

test('User does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
