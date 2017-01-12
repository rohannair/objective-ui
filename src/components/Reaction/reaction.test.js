import React from 'react'

import Reaction from './index.js'

describe('Test suite for Reaction component', () => {
  it('Reaction should exist', () => {
    let wrapper = shallow(<Reaction/>)
    expect(wrapper).toMatchSnapshot()
  })
})

