import React from 'react'

import ObjectiveFeedSidebar from './index.js'

describe('Test suite for ObjectiveFeedSidebar component', () => {
  it('ObjectiveFeedSidebar should exist', () => {
    let wrapper = shallow(<ObjectiveFeedSidebar/>)
    expect(wrapper).toMatchSnapshot()
  })
})

