import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Pill from './index.jsx';
const wrapper = shallow(<Pill/>);

test('Pill does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
