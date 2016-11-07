import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';

import Squads from './index';
const wrapper = shallow(<Squads/>);

test('Squads does not explode', t => {
  t.plan(1);
  t.deepEqual(wrapper.length, 1, 'It exploded...');
});
