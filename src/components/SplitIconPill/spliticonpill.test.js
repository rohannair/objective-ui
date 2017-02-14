import React from 'react'

import SplitIconPill from './index.js'

describe('Test suite for SplitIconPill component', () => {
  it('SplitIconPill should exist', () => {
    let wrapper = shallow(<SplitIconPill/>)
    expect(wrapper).toMatchSnapshot()
  })
})

