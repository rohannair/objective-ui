import React from 'react'

import ObjectiveTab from './index.js'

describe('Test suite for ObjectiveTab component', () => {
  it('ObjectiveTab should exist', () => {
    let wrapper = shallow(<ObjectiveTab/>)
    expect(wrapper).toMatchSnapshot()
  })
})

