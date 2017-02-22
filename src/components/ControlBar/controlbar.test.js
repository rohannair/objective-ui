import React from 'react'

import ControlBar from './index.js'

describe('Test suite for ControlBar component', () => {
  it('ControlBar should exist', () => {
    let wrapper = shallow(<ControlBar/>)
    expect(wrapper).toMatchSnapshot()
  })
})

