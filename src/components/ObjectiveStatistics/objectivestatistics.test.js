import React from 'react'

import ObjectiveStatistics from './index.js'

describe('Test suite for ObjectiveStatistics component', () => {
  it('ObjectiveStatistics should exist', () => {
    let wrapper = shallow(<ObjectiveStatistics/>)
    expect(wrapper).toMatchSnapshot()
  })
})

