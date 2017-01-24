import React from 'react'

import ObjectiveSidebarList from './index.js'

describe('Test suite for ObjectiveSidebarList component', () => {
  it('ObjectiveSidebarList should exist', () => {
    let wrapper = shallow(<ObjectiveSidebarList/>)
    expect(wrapper).toMatchSnapshot()
  })
})

